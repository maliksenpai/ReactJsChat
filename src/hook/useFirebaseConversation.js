import {app} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {UserContext} from "../App";
import {chatReducer} from "../redux/chat/ChatReducer";
import {conversationReducer} from "../redux/conversation/ConversationReducer";

const databaseUrl = process.env.REACT_APP_firebase_database_url

export function useFirebaseConversation() {

    const db = app.database(databaseUrl).ref().child("conversation")
    const dispatch = useDispatch()
    const {user} = useContext(UserContext)
    const conversationActions = conversationReducer.actions
    const chatActions = chatReducer.actions

    useEffect(() => {
        if(!user){
            db.off("child_added")
            db.off("child_changed")
        }
    }, [user])

    function listenFirebase() {
        db.off("child_added")
        db.on("child_added", a => {
            const conversation = a.val()
            if(conversation.creator === user.email || conversation.receiver === user.email){
                dispatch(conversationActions.addConversation(a))
            }
            dispatch(chatActions.updatedConversations(a))
        })
        db.on("child_changed", a => {
            dispatch(conversationActions.updateConversation(a))
            dispatch(chatActions.updatedConversations(a))
        })
    }

    function unlistenFirebase() {

    }

    return {listenFirebase: listenFirebase, unlistenFirebase: unlistenFirebase}
}