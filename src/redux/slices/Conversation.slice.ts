import { Auth } from '../../types/Auth';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ConversationType } from '../../types/conversation';
import { Paginate } from '../../types/common';
import conversationApi from '@apis/conversation.api';
import { fetchConversations } from '@redux/thunks/conversation.thunk';

// Define a type for the slice state
interface AuthState {
    conversations: (ConversationType)[] | null
    isPending?: boolean
    status: "ide" | "loading" | "succeeded" | "failed",
}

// Define the initial state using that type
const initialState: AuthState = {
    isPending: false,
    conversations: null,
    status: "ide"
}

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        updateLastMessage: (state, action: PayloadAction<{ conversationId: string, lastMessage: { sender: any, content: string, createdAt: Date } }>) => {
            if (state.conversations) {
                let newConversations = [...state.conversations]
                let conversation = newConversations.find(cv => cv._id === action.payload.conversationId)
                if (conversation) {
                    newConversations.splice(state.conversations.indexOf(conversation), 1)
                    conversation.lastMessage = action.payload.lastMessage
                    newConversations.unshift(conversation)
                    state.conversations = [...newConversations]
                }

            }
        },
        updateFriendOnlineState: (state, action: PayloadAction<{ userId: string, onlineState: "online" | "offline" }>) => {
            let newList = state.conversations
            if (!newList) return
            for (let conversation of newList) {
                let isHasUser = conversation.members.find(mb => mb._id === action.payload.userId)
                if (isHasUser) {
                    isHasUser.online_status = action.payload.onlineState
                }
            }

            state.conversations = [...newList]
        },
        addConversation: (state, action: PayloadAction<ConversationType>) => {
            if (!state.conversations) {
                state.conversations = [action.payload]
                return
            }
            state.conversations = [action.payload, ...state.conversations]
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchConversations.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchConversations.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.conversations = action.payload || null
        })
        builder.addCase(fetchConversations.rejected, (state) => {
            state.status = "failed"
            state.conversations = null
        })
    },
})

export const { updateLastMessage, updateFriendOnlineState, addConversation } = conversationSlice.actions


export default conversationSlice.reducer