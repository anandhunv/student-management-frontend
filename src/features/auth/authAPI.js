import axios from "../../utils/axios"

export const loginUser = async (userData) => {
  const response = await axios.post("/auth/login", userData)
  return response.data
}



export const getProfile = async () => {
  const res = await axios.get("/auth/profile")
  return res.data
}