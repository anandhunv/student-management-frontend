import { useEffect, useState } from "react"

const PermissionForm = ({ currentPermissions = {}, onSubmit, onCancel }) => {
  // Initialize permissions state based on props or fallback to false
  const initialPermissions = {
    create: currentPermissions?.create || false,
    view: currentPermissions?.view || false,
    edit: currentPermissions?.edit || false,
    delete: currentPermissions?.delete || false,
  }

  const [permissions, setPermissions] = useState(initialPermissions)
  const [hasChanged, setHasChanged] = useState(false)

  // Check if the permission values have changed compared to the initial ones
  useEffect(() => {
    const changed =
      permissions.create !== initialPermissions.create ||
      permissions.view !== initialPermissions.view ||
      permissions.edit !== initialPermissions.edit ||
      permissions.delete !== initialPermissions.delete

    setHasChanged(changed)
  }, [permissions, initialPermissions])

  // Handles toggling individual permissions
  const handleToggle = (key) => {
    const updated = { ...permissions, [key]: !permissions[key] }

    // Ensure "View" is enabled if Create, Edit, or Delete is selected
    if (
      (key === "create" || key === "edit" || key === "delete") &&
      updated[key] === true
    ) {
      updated.view = true
    }

    // If "View" is unchecked, disable Create, Edit, and Delete as well
    if (key === "view" && updated.view === false) {
      updated.create = false
      updated.edit = false
      updated.delete = false
    }

    setPermissions(updated)
  }

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ students: permissions }) // Submit with "students" as the permission key
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Assign Student Permissions
      </h2>

      {/* Permission checkboxes */}
      <div className="grid grid-cols-2 gap-3">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={permissions.view}
            onChange={() => handleToggle("view")}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>View</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={permissions.create}
            onChange={() => handleToggle("create")}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <span>Create</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={permissions.edit}
            onChange={() => handleToggle("edit")}
            className="form-checkbox h-5 w-5 text-yellow-600"
          />
          <span>Edit</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={permissions.delete}
            onChange={() => handleToggle("delete")}
            className="form-checkbox h-5 w-5 text-red-600"
          />
          <span>Delete</span>
        </label>
      </div>

      {/* Display note about permission dependency */}
      <p className="text-xs text-gray-500">
        * "View" is required for Create, Edit, or Delete permissions.
      </p>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!hasChanged} // Disable save if nothing is changed
          className={`px-4 py-2 rounded text-sm ${hasChanged
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default PermissionForm
