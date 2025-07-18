import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchStaff, addStaff, editStaff, deleteStaff, updatePermissions } from "./staffAPI"

export const getStaff = createAsyncThunk("staff/getAll", fetchStaff)
export const createStaff = createAsyncThunk("staff/create", addStaff)
export const updateStaff = createAsyncThunk("staff/edit", editStaff)
export const removeStaff = createAsyncThunk("staff/delete", deleteStaff)
export const assignPermissions = createAsyncThunk("staff/permissions", updatePermissions)

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStaff.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const i = state.list.findIndex((s) => s._id === action.payload._id)
        state.list[i] = action.payload
      })
      .addCase(removeStaff.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s._id !== action.payload._id)
      })
      .addCase(assignPermissions.fulfilled, (state, action) => {
        const i = state.list.findIndex((s) => s._id === action.payload._id)
        state.list[i] = action.payload
      })
  }
})

export default staffSlice.reducer
