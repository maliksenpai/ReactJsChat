import {AppBar, Avatar, Box, CardHeader, CircularProgress, Grid, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {UserContext} from "../App";
import {MessageView} from "./MessageView";
import {useFirebaseListen} from "../hook/useFirebaseListen";
import {useNavigate} from "react-router";

export function ChatView() {

    const chatState = useSelector(state => state.chatReducer)
    const {user} = useContext(UserContext)
    const firebaseListener = useFirebaseListen()

    useEffect(() => {
        if (chatState.chatId) {
            firebaseListener({child: chatState.chatId})
        }
    }, [chatState.chatId])

    return <Box height={"99vh"}>
        <Box flexGrow={1}>
            <AppBar position={"static"} color={"secondary"}>
                <Toolbar>
                    {
                        chatState.person ?
                            <CardHeader
                                sx={{padding: "6px"}}
                                avatar={<Avatar color={"white"} alt={chatState.person.email}> {chatState.person.email[0]} </Avatar>}
                                title={<Typography> {chatState.person.email} </Typography>
                                }
                            >
                            </CardHeader> :
                            null
                    }
                </Toolbar>
            </AppBar>
        </Box>
        <Box>
            {
                chatState.loading ?
                    <CircularProgress/> :
                    chatState.person ?
                        <MessageView/> :
                        <Grid container height={"89vh"} alignItems={"center"} justifyContent={"center"}>
                            <Typography> Select Person to Chat </Typography>
                        </Grid>
            }
        </Box>
    </Box>
}