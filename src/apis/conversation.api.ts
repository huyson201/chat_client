import { MessageType } from "../types/Message"
import { ApiResponse, Paginate } from "../types/common"
import { ConversationType, User } from "../types/conversation"
import axiosInstance from "./axiosInstance"

const conversationApi = {
    getConversations: () => {
        return axiosInstance.get<ApiResponse<ConversationType[]>>("/users/conversations")
    },
    getMessages: (conversationId: string) => {
        return axiosInstance.get<ApiResponse<MessageType[]>>(`conversations/${conversationId}/messages`)
    },
    getConversationById: (id: string) => {
        return axiosInstance.get<ApiResponse<ConversationType>>("/conversations/" + id)
    },
    createConversation: (data: { name: string, is_group: boolean, members: string[] }) => {
        return axiosInstance.post<ApiResponse<ConversationType>>("/conversations", data)
    }
}

export default conversationApi