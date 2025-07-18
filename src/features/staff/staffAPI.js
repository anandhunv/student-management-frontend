import axios from "../../utils/axios"

export const fetchStaff = async () => {
  const res = await axios.get("/staff/all")
  return res.data
}

export const addStaff = async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/staff/create", data)
      return res.data.staff // Only return the staff part
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to create staff"
      return rejectWithValue(message)
    }
  }

export const editStaff = async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/staff/edit/${id}`, data);
      return res.data.staff;
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to update staff";
      return rejectWithValue(message);
    }
  }

export const deleteStaff = async (id) => {
  const res = await axios.delete(`/staff/delete/${id}`)
  return res.data
}

export const updatePermissions = async ({ id, permissions }) => {
  const res = await axios.patch(`/staff/permissions/${id}`, { permissions })
  return res.data
}
