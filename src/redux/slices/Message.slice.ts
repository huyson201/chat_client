import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import { MessageType } from '../../types/Message'
import { fetchMessages } from '@redux/thunks/Message.thunk'

// Define a type for the slice state
interface MessageState {
    conversationId?: string
    messages: MessageType[] | null,
    status: "ide" | "loading" | "succeeded" | "failed",
    error: any

}

// Define the initial state using that type
const initialState: MessageState = {
    messages: null,
    status: "ide",
    error: null

}

interface MessagesData {
    messages: MessageType[] | null,
    conversationId?: string,
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
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

    },
    extraReducers(builder) {
        builder.addCase(fetchMessages.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.status = "succeeded"
        })
        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.status = "failed"
            state.messages = null
            state.error = action.payload
        })
    },
})

export const { addMessage } = messageSlice.actions


export default messageSlice.reducer