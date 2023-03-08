import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import { MessageType } from '../../types/Message'

// Define a type for the slice state
interface MessageState {
    conversationId?: string
    messages: MessageType[] | null,
    totalPages: number,
    nextPage: number | null
}

// Define the initial state using that type
const initialState: MessageState = {
    messages: null,
    totalPages: 1,
    nextPage: null
}

interface MessagesData {
    messages: MessageType[] | null,
    conversationId?: string,
    totalPage: number
    nextPage: number | null
}

export const socketSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<MessagesData>) => {
            state.messages = action.payload.messages?.reverse() || null
            state.conversationId = action.payload.conversationId
            state.totalPages = action.payload.totalPage
            state.nextPage = action.payload.nextPage
        },
        loadMessages: (state, action: PayloadAction<MessagesData>) => {
            let message = action.payload.messages?.reverse() || []
            if (state.messages) {
                state.messages = [...new Set([...message, ...state.messages])]
            }
            else {
                state.messages = [...message]
            }
            state.conversationId = action.payload.conversationId
            state.totalPages = action.payload.totalPage
            state.nextPage = action.payload.nextPage
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

export const { setMessages, addMessage, loadMessages } = socketSlice.actions


export default socketSlice.reducer