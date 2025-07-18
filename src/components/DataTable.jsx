import { FiEdit2, FiTrash2 } from "react-icons/fi";

const DataTable = ({
  data = [],
  fields = [],
  can = () => true,
  onEdit,
  onDelete,
  itemType = "Item",
  extraActions = [],
}) => {
  return data.length === 0 ? (
    <p className="text-center text-gray-500">No {itemType.toLowerCase()}s found.</p>
  ) : (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-blue-50 text-gray-700 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4">#</th>
            {fields.map((field) => (
              <th key={field.key} className="px-6 py-4">
                {field.label}
              </th>
            ))}
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item._id || index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition duration-200`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>

              {fields.map((field) => (
                <td key={field.key} className="px-6 py-4 text-gray-700">
                  {item[field.key]}
                </td>
              ))}

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center items-center gap-4 flex-wrap">

                  {/* Extra Actions for staff  */}
                  {extraActions.map((action, i) => (
                    <div key={i} className="relative group">
                      <button
                        onClick={() => action.onClick(item)}
                        className={`transition ${
                          action.className || "text-yellow-500 hover:text-yellow-700"
                        }`}
                      >
                        {action.label}
                      </button>
                    </div>
                  ))}

                  {/* Edit */}
                  <div className="relative group">
                    <button
                      onClick={() => can("edit") && onEdit(item)}
                      className={`transition ${
                        can("edit")
                          ? "text-blue-600 hover:text-blue-800"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!can("edit")}
                    >
                      <FiEdit2 size={18} />
                    </button>
                    {!can("edit") && (
                      <span className="absolute z-10 opacity-0 group-hover:opacity-100 text-xs text-white bg-black px-2 py-1 rounded top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        No permission
                      </span>
                    )}
                  </div>

                  {/* Delete */}
                  <div className="relative group">
                    <button
                      onClick={() => can("delete") && onDelete(item)}
                      className={`transition ${
                        can("delete")
                          ? "text-red-500 hover:text-red-700"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!can("delete")}
                    >
                      <FiTrash2 size={18} />
                    </button>
                    {!can("delete") && (
                      <span className="absolute z-10 opacity-0 group-hover:opacity-100 text-xs text-white bg-black px-2 py-1 rounded top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        No permission
                      </span>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
