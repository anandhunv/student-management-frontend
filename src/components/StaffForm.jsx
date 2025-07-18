import { useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { handleNameInputChange, validateStaff } from "../utils/helper";

const StaffForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const isEditing = !!initialData?._id;

  const defaultForm = {
    name: "",
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(defaultForm);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      const { password, ...rest } = initialData;
      setFormData({ ...defaultForm, ...rest });
    } else {
      setFormData(defaultForm);
    }
  }, [initialData]);

  useEffect(() => {
    if (isEditing) {
      const { password, ...initial } = initialData;
      const current = { ...formData };

      const changed = Object.keys(initial).some(
        (key) =>
          String(current[key] ?? "")?.trim() !== String(initial[key] ?? "")?.trim()
      );

      setHasChanges(changed);
    }
  }, [formData, initialData, isEditing]);

const handleChange = (e) => handleNameInputChange(e, setFormData);


const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateStaff(formData, isEditing);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  const submitData = { ...formData };
  if (isEditing && !formData.password) {
    delete submitData.password;
  }

  onSubmit(submitData);
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
   <InputField
  label="Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter name"
  error={errors.name}
/>

<InputField
  label="Email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter email"
  error={errors.email}
/>

{!isEditing && (
  <InputField
    label="Password"
    name="password"
    type="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter password"
    error={errors.password}
  />
)}


      <div className="flex gap-3 justify-end pt-2">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isEditing && !hasChanges}
        >
          Save
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;
