import { ClipLoader } from "react-spinners"


const Button = ({
  children,
  disabled = false,
  loading = false,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn w-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition rounded px-4 py-2 font-semibold ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {loading ? <ClipLoader size={20} color="#ffffff" /> : children}
    </button>
  )
}
export default Button
