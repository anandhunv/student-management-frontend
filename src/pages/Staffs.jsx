import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getStaff,
  createStaff,
  updateStaff,
  removeStaff,
  assignPermissions,
} from "../features/staff/staffSlice";

import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import DataTable from "../components/DataTable";
import SearchInput from "../components/SearchInput";
import AddButton from "../components/AddButton";
import FormModal from "../components/FormModal";
import ConfirmModal from "../components/ConfirmModal";
import StaffForm from "../components/StaffForm";
import PermissionForm from "../components/PermissionForm";
import { Navigate } from "react-router";
import toast from "react-hot-toast";

const Staffs = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.staff);
  const { user } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPermForm, setShowPermForm] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmStaff, setConfirmStaff] = useState(null);

  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch]);

  if (user?.role !== "superAdmin") return <Navigate to="/dashboard" />;

  const can = () => true;

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

const handleSubmit = async (data) => {
  try {
    if (editing) {
      await dispatch(updateStaff({ id: editing._id, data })).unwrap()
      toast.success("Staff updated successfully!")
    } else {
      const res = await dispatch(createStaff(data)).unwrap()
      toast.success("Staff created successfully!")
      console.log(res)
    }
    dispatch(getStaff())
    setShowForm(false)
  } catch (errorMessage) {
    console.log(errorMessage)
    toast.error(errorMessage) 
  }
}


  const openConfirm = (action, staff) => {
    setConfirmAction(action);
    setConfirmStaff(staff);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (confirmAction === "delete") {
      dispatch(removeStaff(confirmStaff._id)).then(() => {
        toast.success("Staff deleted successfully!");
        dispatch(getStaff());
      });
    } else if (confirmAction === "edit") {
      setEditing(confirmStaff);
      setShowForm(true);
    }
    setShowConfirm(false);
  };

const handlePermSave = (data) => {
  dispatch(assignPermissions({ id: showPermForm._id, permissions: data })).then(() => {
    dispatch(getStaff()); 
    toast.success("Permissions updated successfully!");
    setShowPermForm(null);
  });
};


const filteredList = list.filter((staff) => {
  const name = staff.name || "";
  const email = staff.email || "";
  return (
    name.toLowerCase().includes(search.toLowerCase()) ||
    email.toLowerCase().includes(search.toLowerCase())
  );
});


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb current="Staff Management" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
          <div className="flex gap-2 flex-wrap items-center">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
            />
            <AddButton label="Staff" onClick={handleAdd} />
          </div>
        </div>

        {/* Form Modal */}
        <FormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Staff"
          isEdit={!!editing?._id}
        >
          <StaffForm
            initialData={editing}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </FormModal>

        {/* Permissions Modal */}
        <FormModal
          isOpen={!!showPermForm}
          onClose={() => setShowPermForm(null)}
          title={`Permissions for ${showPermForm?.name}`}
        >
          <PermissionForm
            currentPermissions={showPermForm?.permissions?.students}
            onSubmit={handlePermSave}
            onCancel={() => setShowPermForm(null)}
          />
        </FormModal>

        {/* Data Table */}
     <DataTable
  data={filteredList}
  fields={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ]}
  can={can}
  itemType="Staff"
  onEdit={(staff) => openConfirm("edit", staff)}
  onDelete={(staff) => openConfirm("delete", staff)}
  extraActions={[
    {
      label: "Permissions",
      onClick: (staff) => setShowPermForm(staff),
      className: "text-yellow-500 hover:text-yellow-700",
    },
  ]}
/>


        {/* Confirm Delete/Edit Modal */}
        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
          title={
            confirmAction === "delete"
              ? "Delete Staff"
              : "Edit Staff Confirmation"
          }
          message={
            confirmAction === "delete"
              ? `Are you sure you want to delete ${confirmStaff?.name}?`
              : `Are you sure you want to edit ${confirmStaff?.name}?`
          }
        />
      </div>
    </div>
  );
};

export default Staffs;
