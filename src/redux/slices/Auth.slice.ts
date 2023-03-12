import { Auth } from '../../types/Auth';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { fetchProfile, loginAuth, logout, registerAccount } from '@redux/thunks/auth.thunk';

// Define a type for the slice state
interface AuthState {
    profile: Auth | null,
    isLoggedIn: boolean | null,
    isPending?: boolean,
    status: "ide" | "loading" | "succeeded" | "failed",
    error: any,
    loginOauth: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
    profile: null,
    isLoggedIn: null,
    status: "ide",
    isPending: false,
    error: null,
    loginOauth: false
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateOnlineStatus: (state, action: PayloadAction<"online" | "offline">) => {
            if (state.profile) {
                state.profile.online_status = action.payload
            }
        },
        loginOauth: (state) => {
            state.loginOauth = true
        },
        setProfile: (state, payload: PayloadAction<Auth>) => {
            state.profile = payload.payload
            state.isLoggedIn = true
        }
    },
    extraReducers(builder) {
        // login
        builder.addCase(loginAuth.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(loginAuth.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.profile = action.payload
            state.isLoggedIn = true
            state.error = null

        })
        builder.addCase(loginAuth.rejected, (state, action) => {
            state.status = 'failed'
            state.profile = null
            state.isLoggedIn = false
            console.log("payload_error")
            console.log(action.payload)
            console.log("error")
            console.log(action.error)
            state.error = action.error
        })

        // fetch profile
        builder.addCase(fetchProfile.pending, (state, action) => {
            state.status = 'loading'
            state.error = null

        })

        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.profile = action.payload
            state.isLoggedIn = true
            state.error = null

        })

        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.status = 'failed'
            state.profile = null
            state.isLoggedIn = false
            state.error = action.payload
        })

        // register
        builder.addCase(registerAccount.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(registerAccount.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.profile = action.payload
            state.isLoggedIn = true
            state.error = null

        })
        builder.addCase(registerAccount.rejected, (state, action) => {
            state.status = 'failed'
            state.profile = null
            state.isLoggedIn = false
            state.error = action.payload
        })

        // logout
        builder.addCase(logout.pending, (state, action) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.profile = null
            state.isLoggedIn = false
            state.error = null
            state.loginOauth = false

        })
        builder.addCase(logout.rejected, (state, action) => {
            state.status = 'failed'
            state.profile = null
            state.isLoggedIn = false
            state.error = action.payload
            state.loginOauth = false
        })


    },
})



export const { setProfile, updateOnlineStatus, loginOauth } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer