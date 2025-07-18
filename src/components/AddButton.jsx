
const AddButton = ({ label = "Add", onClick, canAccess = true }) => {
  return (
    <div className="relative group">
      <button
        className={`px-4 py-2 rounded-md transition ${
          canAccess
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={canAccess ? onClick : undefined}
      >
        Add {label}
      </button>

      {!canAccess && (
        <span className="absolute z-10 opacity-0 group-hover:opacity-100 text-xs text-white bg-black px-2 py-1 rounded top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
          Contact admin
        </span>
      )}
    </div>
  );
};

export default AddButton;
