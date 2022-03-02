import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    conversations: []
}

export const conversationReducer = createSlice({
    name: "conversationReducer",
    initialState: initialState,
    reducers: {
        initConversations: (state, action) => {
            const copyState = {...state}
            let conversations = []
            action.payload.forEach(element => {
                conversations.push(element.val())
            })
            conversations = conversations.sort((a,b) => b.sortTime - a.sortTime)
            copyState.conversations = conversations
            return copyState
        },
        addConversation: (state, action) => {
            const copyState = {...state}
            const conversations = [...copyState.conversations]
            conversations.push(action.payload.val())
            copyState.conversations = conversations
            return copyState
        },
        updateConversation: (state, action) => {
            const copyState = {...state}
            let conversations = [...copyState.conversations]
            const conversationIndex = conversations.findIndex(element => element.id === action.payload.val().id)
            if(conversationIndex !== -1){
                conversations[conversationIndex] = action.payload.val()
                conversations = conversations.sort((a,b) => b.sortTime - a.sortTime)
                copyState.conversations = conversations
            }
            return copyState
        }
    },
    extraReducers: builder => {

    }
})