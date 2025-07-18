const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-1 focus:ring-black outline-0 px-4 py-2 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export default InputField
