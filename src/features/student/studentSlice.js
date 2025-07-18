import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "./studentAPI"

export const getStudents = createAsyncThunk("students/getAll", fetchStudents)
export const createStudent = createAsyncThunk("students/create", addStudent)
export const editStudent = createAsyncThunk("students/edit", updateStudent)
export const removeStudent = createAsyncThunk("students/delete", deleteStudent)

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s._id === action.payload._id)
        state.list[index] = action.payload
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s._id !== action.payload._id)
      })
  }
})

export default studentSlice.reducer
