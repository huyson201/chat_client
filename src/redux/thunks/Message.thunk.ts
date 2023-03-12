import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conversationApi from "@apis/conversation.api";
import { MessageType } from "../../types/Message";


export const fetchMessages = createAsyncThunk<MessageType[], { conversationId: string }>(
    "message/fetch",
    async ({ conversationId }, reject) => {
        try {
            let res = await conversationApi.getMessages(conversationId)
            return res.data.data
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return reject.rejectWithValue(error.response?.data)
            }
            return reject.rejectWithValue(error.message)
        }
    })