import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth)

  if (loading) return <div className="text-center mt-10">Loading...</div>

  return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
