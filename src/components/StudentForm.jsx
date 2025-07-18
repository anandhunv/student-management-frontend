import { useState, useEffect } from "react"
import { grades } from "../utils/constants"
import InputField from "../components/InputField"
import { handleNameInputChange, validateStudent } from "../utils/helper"
import Button from "./Button"

const StudentForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const defaultForm = {
    name: "",
    age: "",
    grade: "",
    contact: "",
  }

  const [formData, setFormData] = useState(defaultForm)
  const [originalData, setOriginalData] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const merged = { ...defaultForm, ...initialData }
    setFormData(merged)
    setOriginalData(merged)
  }, [initialData])

  const handleChange = (e) => handleNameInputChange(e, setFormData)

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateStudent(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData)
    }
  }

  const isChanged = JSON.stringify(formData) !== JSON.stringify(originalData)

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl"
    >
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter full name"
        error={errors.name}
      />
      <InputField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Enter age"
        error={errors.age}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Grade
        </label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
          className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-1 focus:ring-black outline-0 px-4 py-2 ${
            errors.grade ? "border-red-500" : ""
          }`}
        >
          <option value="">Select grade</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p className="text-sm text-red-600 mt-1">{errors.grade}</p>
        )}
      </div>

      <InputField
        label="Contact"
        name="contact"
        type="tel"
        value={formData.contact}
        onChange={handleChange}
        placeholder="10-digit mobile number"
        error={errors.contact}
      />

      <div className="flex gap-3 justify-end pt-2">
        <Button
          type="submit"
          className="px-6 py-2"
          disabled={!isChanged} 
        >
          Save
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default StudentForm
