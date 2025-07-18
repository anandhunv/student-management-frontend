import { useNavigate } from "react-router"

const Breadcrumb = ({ current }) => {
  const navigate = useNavigate()

  return (
    <div className="text-sm text-gray-600 space-x-1 mb-1">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-blue-600 hover:underline"
      >
        Dashboard
      </button>
      <span>/</span>
      <span className="text-gray-800 font-medium">{current}</span>
    </div>
  )
}

export default Breadcrumb
