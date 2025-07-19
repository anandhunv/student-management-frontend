import { useDispatch, useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import {
  createStudent,
  editStudent,
  getStudents,
  removeStudent,
} from "../features/student/studentSlice";
import Header from "../components/Header";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import Breadcrumb from "../components/Breadcrumb";
import DataTable from "../components/DataTable";
import SearchInput from "../components/SearchInput";
import AddButton from "../components/AddButton";
import FormModal from "../components/FormModal";
import StudentForm from "../components/StudentForm";

const Students = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmStudent, setConfirmStudent] = useState(null);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const can = (action) =>
    user?.role === "superAdmin" || user?.permissions?.students?.[action];

//   const can = useCallback(
//   (action) =>  user?.role === "superAdmin" ||user?.permissions?.[action],
//   [user] // re-create when user/permissions change
// );
  const handleAdd = () => {
    if (!can("create")) return;
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = (data) => {
    if (editing) {
      dispatch(editStudent({ id: editing._id, data })).then(() => {
        dispatch(getStudents());
        toast.success("Student updated successfully!"); 
      });
    } else {
      dispatch(createStudent(data)).then(() => {
        dispatch(getStudents());
        toast.success("Student created successfully!"); 
      });
    }
    setShowForm(false);
  };

  const openConfirm = (action, student) => {
    if (!can(action)) return;
    setConfirmAction(action);
    setConfirmStudent(student);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (confirmAction === "delete") {
      dispatch(removeStudent(confirmStudent._id)).then(() => {
        dispatch(getStudents());
        toast.success("Student deleted successfully!"); // ✅ toast
      });
    } else if (confirmAction === "edit") {
      setEditing(confirmStudent);
      setShowForm(true);
    }
    setShowConfirm(false);
  };

  const filteredList = list.filter(
    (staff) =>
      (staff?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (staff?.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb current="Student Management" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Student Management
          </h2>

          <div className="flex gap-2 flex-wrap items-center">
            {/* Searching Section */}

            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
            />

            {/* Student Creating Button Section */}

            <AddButton
              label="Student"
              onClick={handleAdd}
              canAccess={can("create")}
            />
          </div>
        </div>

        {/*Create Student Form Modals */}
        <FormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title="Student"
          isEdit={!!editing?._id}
        >
          <StudentForm
            initialData={editing}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </FormModal>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredList.length === 0 ? (
          <p className="text-center text-gray-500">No students found.</p>
        ) : (
          <DataTable
            data={filteredList}
            fields={[
              { key: "name", label: "Name" },
              { key: "age", label: "Age" },
              { key: "grade", label: "Grade" },
              { key: "contact", label: "Contact" },
            ]}
            can={can}
            itemType="Student"
            onEdit={(student) => openConfirm("edit", student)}
            onDelete={(student) => openConfirm("delete", student)}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title={
          confirmAction === "delete"
            ? "Delete Student"
            : "Edit Student Confirmation"
        }
        message={
          confirmAction === "delete"
            ? `Are you sure you want to delete ${confirmStudent?.name}?`
            : `Are you sure you want to edit ${confirmStudent?.name}?`
        }
      />
    </div>
  );
};

export default Students;
