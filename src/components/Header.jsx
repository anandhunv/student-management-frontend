import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/auth/authSlice"
import axios from "../utils/axios"
import { useNavigate } from "react-router"
import Button from "./Button"
import ConfirmModal from "./ConfirmModal"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await axios.post("/auth/logout")
    dispatch(logoutUser())
    navigate("/")
  }

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-white shadow-md px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
          SM<span className="text-gray-700"> S</span>
        </h1>

        {/* Desktop User Info */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-800">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.role}</div>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
          >
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity bg-black/40 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="text-sm font-medium text-gray-700">
            <div>{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.role}</div>
          </div>
          <Button
            onClick={() => {
              setMenuOpen(false)
              setIsModalOpen(true)
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-2"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
      />
    </>
  )
}

export default Header
