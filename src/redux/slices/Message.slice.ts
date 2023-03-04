import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import { MessageType } from '../../types/Message'

// Define a type for the slice state
interface MessageState {
    conversationId?: string
    messages: MessageType[] | null
}

// Define the initial state using that type
const initialState: MessageState = {
    messages: null
}

interface MessagesData {
    messages: MessageType[] | null,
    conversationId?: string
}

export const socketSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<MessagesData>) => {
            state.messages = action.payload.messages?.reverse() || null
            state.conversationId = action.payload.conversationId
        },
        addMessage: (state, action: PayloadAction<MessageType>) => {
            let newMessages
            if (state.messages) {
                newMessages = [...state.messages, action.payload]
            }
            else {
                newMessages = [action.payload]
            }
            state.messages = newMessages


        }

    }
})

export const { setMessages, addMessage } = socketSlice.actions


export default socketSlice.reducer