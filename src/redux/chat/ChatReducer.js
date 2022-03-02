import {createSlice} from "@reduxjs/toolkit";
import {deliveredMessage, getChat, sendMessage} from "./ChatActions";
import {setDeliveredMessageData} from "../../firebase/messageFirebase";

const initialState = {
    messages: [],
    person: null,
    loading: false,
    chatId: null,
    conversation: null
}

export const chatReducer = createSlice({
    name: "charReducer",
    initialState: initialState,
    reducers: {
        getMessages: (state, action) => {
            const copyState = {...state}
            const messages = []
            action.payload.forEach(element => {
                const message = {...element.val(), id: element.key}
                messages.push(message)
            })
            copyState.messages = messages
            return copyState
        },
        newMessage: (state, action) => {
            const copyState = {...state}
            const messages = [...state.messages]
            messages.push(action.payload.message)
            copyState.messages = messages
            return copyState
        },
        updateMessage: (state, action) => {
            const copyState = {...state}
            const messages = [...state.messages]
            const message = {...action.payload.val(), id: action.payload.key}
            const messageIndex = messages.findIndex(element => element.id === message.id)
            messages[messageIndex] = message
            copyState.messages = messages
            return copyState
        },
        updatedConversations: (state, action) => {
            const copyState = {...state}
            if(copyState.chatId === action.payload.val().id){
                copyState.conversation = action.payload.val()
            }
            return copyState
        },
        setConversation: (state, action) => {
            const copyState = {...state}
            copyState.conversation = action.payload
            return copyState
        }
    },
    extraReducers: builder => {
        builder.addCase(getChat.pending, (state, action) => {
            const copyState = {...state}
            copyState.loading = true
            copyState.messages = []
            copyState.chatId = null
            copyState.person = action.meta.arg.person
            return copyState
        })
        builder.addCase(getChat.fulfilled, (state, action) => {
            const copyState = {...state}
            copyState.loading = false
            copyState.messages = []
            copyState.chatId = action.payload.response
            return copyState
        })
        builder.addCase(sendMessage.pending, (state, action) => {
            const copyState = {...state}
            const messages = [...copyState.messages]
            messages.push(action.meta.arg.message)
            copyState.messages = messages
            return copyState
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            const copyState = {...state}
            const copyMessage = [...copyState.messages]
            const newMessage = {...action.payload.response.val(), id: action.payload.response.key}
            const messageIndex = copyMessage.findIndex(
                message =>
                    message.sendTime === newMessage.sendTime &&
                    message.sender === newMessage.sender
            )
            copyMessage[messageIndex] = newMessage
            copyState.messages = copyMessage
            return copyState
        })
    }
})
