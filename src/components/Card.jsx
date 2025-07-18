import { Link } from "react-router"

const DashboardCard = ({ title, description, link, image }) => {
  return (
    <Link
      to={link}
      className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
    >
      {/* Top Image */}
      <div className="h-44 bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-20 w-20 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Bottom Content */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 leading-snug">{description}</p>
      </div>
    </Link>
  )
}

export default DashboardCard
