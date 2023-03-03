import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

// Define a type for the slice state
interface SocketState {
    socket: any
    isConnection: boolean
}

// Define the initial state using that type
const initialState: SocketState = {
    socket: null,
    isConnection: false
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<Socket>) => {
            state.socket = action.payload
            state.isConnection = action.payload.connected
        },
        disconnectSocket: (state) => {
            state.socket = null
            state.isConnection = false
        }

    }
})

export const { setSocket, disconnectSocket } = socketSlice.actions


export default socketSlice.reducer