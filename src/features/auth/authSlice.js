import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, getProfile } from "./authAPI"

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await loginUser(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    return await getProfile()
  } catch (error) {
    return thunkAPI.rejectWithValue(null)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false
        state.user = null
      })
  }
})

export const { logoutUser } = authSlice.actions
export default authSlice.reducer
