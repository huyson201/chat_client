import { Auth } from '../../types/Auth';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ConversationType } from '../../types/conversation';
import { Paginate } from '../../types/common';
import conversationApi from '@apis/conversation.api';

// Define a type for the slice state
interface AuthState {
    conversations: (ConversationType)[] | null
    isPending?: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
    isPending: false,
    conversations: null
}

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        setConversation: (state, payload: PayloadAction<Paginate<ConversationType>>) => {
            state.isPending = false
            state.conversations = payload.payload.docs
        },
        setPendingConversation: (state, action: PayloadAction<boolean>) => {
            state.isPending = action.payload
        },
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
                else {
                    conversationApi.getConversationById(action.payload.conversationId).then(res => {
                        newConversations.pop()
                        newConversations.unshift(res.data.data)
                        state.conversations = [...newConversations]
                    })
                }
            }
        }
    }
})

export const { setConversation, setPendingConversation, updateLastMessage } = conversationSlice.actions


export default conversationSlice.reducer