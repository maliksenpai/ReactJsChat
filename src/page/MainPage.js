import {useContext, useEffect} from "react";
import {UserContext} from "../App";
import {useNavigate} from "react-router";
import {Box, Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import {ContactsView} from "../view/ContactsView";
import {ChatView} from "../view/ChatView";
import {useFirebaseConversation} from "../hook/useFirebaseConversation";
import {useFirebaseContact} from "../hook/useFirebaseContact";

export function MainPage() {

    const conversations = useFirebaseConversation()
    const contacts = useFirebaseContact()

    useEffect(() => {
        contacts.listenFirebase()
        conversations.listenFirebase()
    })

    return <Grid container height={"100vh"}>
        <Grid item flex={2}>
            <ContactsView />
        </Grid>
        <Grid item flex={8}>
            <ChatView />
        </Grid>
    </Grid>
}