import { Auth, AuthCommonInfo } from "../types/Auth"
import { RequestFriend } from "../types/RequestFriend"
import { ApiResponse } from "../types/common"
import { ConversationType } from "../types/conversation"
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
    },
    getFriends: () => {
        return axiosInstance.get<ApiResponse<AuthCommonInfo[]>>("/users/friends")
    },
    getGroups: () => {
        return axiosInstance.get<ApiResponse<ConversationType[]>>("/users/groups")
    },
    getRequestFriend: () => {
        return axiosInstance.get<ApiResponse<RequestFriend>>("users/request-friends")
    }
}

export default authApis