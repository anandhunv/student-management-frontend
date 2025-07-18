import axiosInstance from "../../utils/axios"

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData)
  return response.data
}



export const getProfile = async () => {
  const res = await axiosInstance.get("/auth/profile")
  return res.data
}