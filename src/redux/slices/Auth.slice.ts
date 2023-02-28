import { Auth } from '../../types/Auth';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface AuthState {
    profile: Auth | null,
    isLoggedIn: boolean | null
}

// Define the initial state using that type
const initialState: AuthState = {
    profile: null,
    isLoggedIn: null
}

export const counterSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        loginSuccess: (state, payload: PayloadAction<Auth>) => {
            state.profile = payload.payload
            state.isLoggedIn = true
        },
        setProfile: (state, payload: PayloadAction<Auth>) => {
            state.profile = payload.payload
            state.isLoggedIn = true
        },
        logOut: (state) => {
            state.profile = null
            state.isLoggedIn = false
        }

    },
})

export const { loginSuccess, setProfile, logOut } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

export default counterSlice.reducer