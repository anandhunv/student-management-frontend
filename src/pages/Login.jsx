import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate, Navigate } from "react-router"
import { login } from "../features/auth/authSlice"
import Input from "../components/Input"
import Button from "../components/Button"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { loading, error, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (user) return <Navigate to="/dashboard" />

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(login(formData))
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-700">School Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Login with your Staff/Admin credentials</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

<Button loading={loading}>
  Login
</Button>        </form>

       
      </div>
    </div>
  )
}

export default Login
