import { MessageType } from "../types/Message"
import { ApiResponse, Paginate } from "../types/common"
import { ConversationType } from "../types/conversation"
import axiosInstance from "./axiosInstance"

const conversationApi = {
    getConversations: () => {
        return axiosInstance.get<ApiResponse<Paginate<ConversationType>>>("/users/conversations")
    },
    getMessages: (conversationId: string) => {
        return axiosInstance.get<ApiResponse<Paginate<MessageType>>>(`conversations/${conversationId}/messages`)
    }
}

export default conversationApi