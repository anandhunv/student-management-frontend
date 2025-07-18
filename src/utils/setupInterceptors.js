import axios from "./axios"
import { logoutUser } from "../features/auth/authSlice"

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
          await axios.get("/auth/refresh", {
            withCredentials: true,
          })
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
