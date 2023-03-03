import { Auth } from '../../types/Auth';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ConversationsResponse, ConversationType } from '../../types/conversation';

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
        setConversation: (state, payload: PayloadAction<ConversationsResponse>) => {
            state.isPending = false
            state.conversations = payload.payload.docs
        },
        setPendingConversation: (state, action: PayloadAction<boolean>) => {
            state.isPending = action.payload
        }
    }
})

export const { setConversation, setPendingConversation } = conversationSlice.actions


export default conversationSlice.reducer