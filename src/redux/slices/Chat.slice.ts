import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import { ConversationType } from '../../types/conversation'

// Define a type for the slice state
interface ChatState {
    currentChat: ConversationType | null
    isChat: boolean
}

// Define the initial state using that type
const initialState: ChatState = {
    currentChat: null,
    isChat: false
}

export const ChatSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setCurrentChatAndChat: (state, action: PayloadAction<ConversationType>) => {
            state.currentChat = action.payload
            state.isChat = true
        },
        setIsChat: (state, action: PayloadAction<boolean>) => {
            state.isChat = action.payload
        }

    }
})

export const { setCurrentChatAndChat, setIsChat } = ChatSlice.actions


export default ChatSlice.reducer