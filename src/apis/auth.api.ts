import { Auth } from "../types/Auth"
import { ApiResponse } from "../types/common"
import axiosInstance from "./axiosInstance"

const authApis = {
    login: (email: string, password: string) => {
        return axiosInstance.post<ApiResponse<Auth>>("/auth/login", {
            email, password
        })
    },
    register: (data: { first_name: string, last_name: string, email: string, password: string, confirmPassword: string }) => {
        return axiosInstance.post<ApiResponse<Auth>>("/auth/register", data)
    },
    getProfile: () => {
        return axiosInstance.get<ApiResponse<Auth>>("/auth/profile")
    },
    logout: () => {
        return axiosInstance.post("/auth/logout")
    }
}

export default authApis