import axios from "../../utils/axios"

export const fetchStudents = async () => {
  const res = await axios.get("/students")
  return res.data
}

export const addStudent = async (data) => {
  const res = await axios.post("/students", data)
  return res.data
}

export const updateStudent = async ({ id, data }) => {
  const res = await axios.put(`/students/${id}`, data)
  return res.data
}

export const deleteStudent = async (id) => {
  const res = await axios.delete(`/students/${id}`)
  return res.data
}
