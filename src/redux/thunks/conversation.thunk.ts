import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Auth } from "../../types/Auth";
import conversationApi from "@apis/conversation.api";
import { ConversationType } from "../../types/conversation";


export const fetchConversations = createAsyncThunk<ConversationType[] | undefined>(
    "conversation/fetch",
    async (_, reject) => {
        try {
            let res = await conversationApi.getConversations()
            return res.data.data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return reject.rejectWithValue(error.response?.data)
            }
            return reject.rejectWithValue(error.message)
        }
    })