import React from "react";

const FormModal = ({ isOpen, onClose, children, title = "Form", isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-lg p-6 relative">
        <h3 className="text-lg font-semibold mb-4">
          {isEdit ? `Edit ${title}` : `Add ${title}`}
        </h3>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default FormModal;
