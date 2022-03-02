import {combineReducers} from "redux";
import {chatReducer} from "./chat/ChatReducer";
import {contactReducer} from "./contact/ContactReducer";
import {conversationReducer} from "./conversation/ConversationReducer";

export const MainReducer = combineReducers({
    chatReducer: chatReducer.reducer,
    contactReducer: contactReducer.reducer,
    conversationReducer: conversationReducer.reducer
})