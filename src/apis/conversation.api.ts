import { ApiResponse } from "../types/common"
import { ConversationsResponse } from "../types/conversation"
import axiosInstance from "./axiosInstance"

const conversationApi = {
    getConversations: () => {
        return axiosInstance.get<ApiResponse<ConversationsResponse>>("/users/conversations")
    }
}

export default conversationApi