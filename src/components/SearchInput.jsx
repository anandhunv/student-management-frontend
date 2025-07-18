import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className={`relative`}>
      <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
