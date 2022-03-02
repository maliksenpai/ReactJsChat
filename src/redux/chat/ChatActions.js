import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetMessagesData, sendMessageData, setDeliveredMessageData} from "../../firebase/messageFirebase";

export const getChat = createAsyncThunk(
    "getChat",
    async ({userId, person}) => {
        const sort = userId.localeCompare(person.id)
        const chatId = sort === 1 ? `${userId}_${person.id}` : `${person.id}_${userId}`
        //const response = GetMessagesData({chatId: chatId})
        return {
            response: chatId
        }
    }
)

export const sendMessage = createAsyncThunk(
    "sendMessage",
    async ({chatId, message, receiver, conversation, user}) => {
        const response = await sendMessageData({
            chatId: chatId,
            message: message,
            receiver: receiver,
            conversation: conversation,
            user: user
        })
        return {
            response: response
        }
    }
)


export const sendDeliveredMessage = createAsyncThunk(
    "sendDeliveredMessage",
    async ({chatId, message}) => {
        await setDeliveredMessageData({chatId: chatId, message: message})
    }
)
