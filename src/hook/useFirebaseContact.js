import {app} from "../index";
import {useDispatch} from "react-redux";
import {useContext, useEffect} from "react";
import {UserContext} from "../App";
import {conversationReducer} from "../redux/conversation/ConversationReducer";
import {contactReducer} from "../redux/contact/ContactReducer";

const databaseUrl = process.env.REACT_APP_firebase_database_url

export function useFirebaseContact() {

    const db = app.database(databaseUrl).ref().child("contact")
    const dispatch = useDispatch()
    const {user} = useContext(UserContext)
    const contactActions = contactReducer.actions

    useEffect(() => {
        if(!user){
            db.off("child_added")
            db.off("child_changed")
        }
    }, [user])

    function listenFirebase() {
        db.off("child_added")
        db.off("child_changed")
        db.on("child_added", a => {
            const contact = a.val()
            if(contact.id !== user.uid){
                dispatch(contactActions.addContact(contact))
            }
        })
        db.on("child_changed", a => {
            dispatch(contactActions.updateContact(a))
        })
    }

    function unlistenFirebase() {

    }

    return {listenFirebase: listenFirebase, unlistenFirebase: unlistenFirebase}
}