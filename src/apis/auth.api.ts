import { Auth } from "../types/Auth"
import { ApiResponse } from "../types/common"
import axiosInstance from "./axiosInstance"

const authApis = {
    login: (email: string, password: string) => {
        return axiosInstance.post<ApiResponse<Auth>>("/auth/login", {
            email, password
        })
    },
    getProfile: () => {
        return axiosInstance.get<ApiResponse<Auth>>("/auth/profile")
    }
}

export default authApis