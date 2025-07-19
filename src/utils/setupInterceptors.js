import axios from "./axios"
import { logoutUser, loadUser } from "../features/auth/authSlice"
import axiosInstance from "./axios"

export const setupInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true
        try {
          await axiosInstance.get("/auth/refresh", {
            withCredentials: true,
          })

          // Immediately reload the user
          store.dispatch(loadUser())

          // Retry the original failed request
          return axios(originalRequest)
        } catch (refreshError) {
          store.dispatch(logoutUser())
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )
}
