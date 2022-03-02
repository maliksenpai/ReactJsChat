import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {chatReducer} from "../redux/chat/ChatReducer";
import {app} from "../index";
import {UserContext} from "../App";
import {sendDeliveredMessage} from "../redux/chat/ChatActions";

const databaseUrl = process.env.REACT_APP_firebase_database_url

export function useFirebaseListen() {

    const db = app.database(databaseUrl).ref().child("messages")
    const dispatch = useDispatch()
    const {user} = useContext(UserContext)
    const chatActions = chatReducer.actions

    useEffect(() => {
        if(!user){
            db.off("value")
            db.off("child_added")
            db.off("child_changed")
        }
    }, [user])

    function listenFirebase({child}) {
        db.off("value")
        db.off("child_added")
        db.off("child_changed")
        if(child){
            db.child(child).once("value", a => {
                dispatch(chatActions.getMessages(a))
            })
            db.child(child).on("child_added", a => {
                const newMessage = {...a.val(), id: a.key}
                if(newMessage.sender !== user.email){
                    dispatch(chatActions.newMessage({message: newMessage, currentUser: user}))
                    dispatch(sendDeliveredMessage({message: newMessage, chatId: child}))
                }
            })
            db.child(child).on("child_changed", a => {
                dispatch(chatActions.updateMessage(a))
            })
        }
    }

    return listenFirebase

}