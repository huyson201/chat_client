import { FindFriendData } from "../types/RequestFriend"
import { ApiResponse } from "../types/common"
import axiosInstance from "./axiosInstance"

const friendApis = {
    findUser: (email: string) => {
        return axiosInstance.get<ApiResponse<FindFriendData>>("users/find" + `?email=${email}`)
    },
    createRequestFriend: (recipientId: string, request_text: string) => {
        return axiosInstance.post("friends/requests", {
            recipientId,
            request_text
        })
    },
    updateRequestFriend: (requestId: string, status: "accepted" | "rejected") => {
        return axiosInstance.put(`friends/requests/${requestId}`, { status })
    }
}

export default friendApis