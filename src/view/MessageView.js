import {Box, Card, CardActions, CardContent, CardHeader, Grid, IconButton, TextField, Typography} from "@mui/material";
import {AccessTime, Done, DoneAll, Send} from "@mui/icons-material";
import '../App.css'
import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserContext} from "../App";
import {chatReducer} from "../redux/chat/ChatReducer";
import {sendMessage} from "../redux/chat/ChatActions";

export function MessageView() {

    const [text, setText] = useState("")
    const {user} = useContext(UserContext)
    const chatState = useSelector(state => state.chatReducer)
    const conversationState = useSelector(state => state.conversationReducer)
    const chatActions = chatReducer.actions
    const dispatch = useDispatch()
    const messagesRef = useRef(null)


    const handleSentMessage = (event) => {
        if (text) {
            const message = {
                messageText: text,
                sender: user.email,
                status: 0,
                sendTime: new Date().getTime()
            }
            setText("")
            dispatch(sendMessage({
                chatId: chatState.chatId,
                message: message,
                receiver: chatState.person,
                conversation: chatState.conversation,
                user: user
            }))
            messagesRef.current.scrollIntoView({behaviour: "auto"});
        }
        event.preventDefault()
    }

    const time = ({timeStamp}) => {
        const date = new Date(timeStamp)
        const isSameDay = checkSameDay({date: date})
        if (isSameDay) {
            return `${date.getHours()}:${date.getMinutes()}`
        } else {
            return date.toLocaleDateString("tr-TR")
        }
    }

    const checkSameDay = ({date}) => {
        const currentDate = new Date()
        return date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getDate() === currentDate.getDate()
    }

    useEffect(() => {
        messagesRef.current.scrollIntoView({behaviour: "auto"})
    }, [chatState.chatId, chatState.loading, chatState.messages])

    useEffect(() => {
        dispatch(chatActions.setConversation(
            conversationState.conversations.find(element => element.id === chatState.chatId)
        ))
    }, [chatState.chatId])


    return <div>
        <Box height={"80vh"} display={"flex"} flexDirection={"column"} overflow={"hidden"} sx={{overflowY: "scroll"}}>
            {
                chatState.messages.map(element => {
                    return <Box display={"flex"} key={element.sendTime} p={0.5} m={0}
                                justifyContent={element.sender === user.email ? "right" : "left"} color={"white"}>
                        <Box p={1} bgcolor={element.sender === user.email ? "darkseagreen" : "mediumpurple"}
                             width={"fit-content"} maxWidth={"50%"} borderRadius={2} my={1} alignItems={"center"}>
                            <Box textAlign={element.sender === user.email ? "end" : "start"}>
                                <Typography fontWeight={"bolder"}>{element.sender}</Typography>
                            </Box>
                            <Box textAlign={element.sender === user.email ? "end" : "start"}>
                                <Typography>{element.messageText}</Typography>
                            </Box>
                            <Box textAlign={element.sender === user.email ? "end" : "start"}>
                                <Typography display={"inline"}>{time({timeStamp: element.sendTime})}</Typography>
                                {
                                    element.sender === user.email ? element.status === 0 ?
                                        <AccessTime/> : element.status === 1 ? <Done/> : <DoneAll/> : null
                                }
                            </Box>
                        </Box>
                    </Box>
                })
            }
            <Box ref={messagesRef}/>
        </Box>
        <form onSubmit={handleSentMessage}>
            <Box height={"10vh"} px={2} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Box width={"90%"} display={"inline-block"}>
                    <TextField fullWidth size={"small"} value={text} onChange={(event) => setText(event.target.value)}/>
                </Box>
                <IconButton type={"submit"} className={"sendButton"} onClick={handleSentMessage}>
                    <Send/>
                </IconButton>
            </Box>
        </form>
    </div>
}