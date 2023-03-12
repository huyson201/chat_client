import authApis from "@apis/auth.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Auth } from "../../types/Auth";
import { RegisterFormType } from "@components/RegisterForm/RegisterForm";

export const loginAuth = createAsyncThunk<Auth, { email: string, password: string }>(
    "auth/login",
    async ({ email, password }, reject) => {
        try {
            let res = await authApis.login(email, password)
            return res.data.data as Auth
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return reject.rejectWithValue(error.response?.data)
            }
            return reject.rejectWithValue(error.message)
        }
    })

export const fetchProfile = createAsyncThunk<Auth>(
    "auth/profile",
    async (_, reject) => {
        try {
            let res = await authApis.getProfile()
            return res.data.data as Auth
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return reject.rejectWithValue(error.response?.data)
            }
            return reject.rejectWithValue(error.message)
        }
    })

export const registerAccount = createAsyncThunk<Auth, RegisterFormType>(
    "auth/register",
    async (data: RegisterFormType, reject) => {
        try {
            let res = await authApis.register(data)
            return res.data.data
        } catch (error: any) {

            if (axios.isAxiosError(error)) {
                return reject.rejectWithValue(error.response?.data)
            }
            return reject.rejectWithValue(error.message)
        }
    })

export const logout = createAsyncThunk("auth/logout", async (_, reject) => {
    try {
        let res = await authApis.logout()
        return res.data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return reject.rejectWithValue(error.response?.data)
        }
        return reject.rejectWithValue(error.message)

    }
})