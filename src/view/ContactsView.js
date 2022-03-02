import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {getInitialContacts} from "../redux/contact/ContactActions";
import {
    AppBar,
    Box, Button,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Tab, Tabs,
    TextField,
    Toolbar, Typography
} from "@mui/material";
import {logoutUser} from "../firebase/firebaseAuth";
import {getChat} from "../redux/chat/ChatActions";

export function ContactsView() {

    const contactState = useSelector(state => state.contactReducer)
    const conversationState = useSelector(state => state.conversationReducer)
    const [tabIndex, setTabIndex] = useState(0)
    const chatState = useSelector(state => state.chatReducer)
    const {user} = useContext(UserContext)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            //dispatch(getInitialContacts({email: user.email}))
        }
    }, [user])

    const handleLogout = () => {
        logoutUser();
    }

    const handleStartChat = (person) => {
        dispatch(getChat({userId: user.uid, person: {email: person.email, id: person.id}}))
    }

    const handleChangeTabIndex = (event, newValue) => {
        setTabIndex(newValue)
    }

    return <Box borderRight={1} borderColor={"grey"} height={"99vh"}>
        <Box flexGrow={1}>
            <AppBar position={"static"} color={"secondary"}>
                <Toolbar>
                    <Typography flexGrow={1}>
                        Chat App
                    </Typography>
                    <Button variant={"contained"} color={"error"} onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Box width={"100%"}>
            <Box>
                <Tabs
                    value={tabIndex}
                    onChange={handleChangeTabIndex}
                    TabIndicatorProps={{style: {backgroundColor: "purple"}}}
                    textColor={"inherit"}
                    label={"contactView"}>
                    <Tab value={0} label={"Conversations"}/>
                    <Tab value={1} label={"Contacts"}/>
                </Tabs>
            </Box>
            {
                tabIndex === 0 ?
                    <Box pt={2} display={"flex"} flexDirection={"column"} alignItems={"center"}
                         justifyContent={"center"}>
                        <TextField variant={"outlined"} placeholder={"Search"}/>
                        {
                            conversationState.loading ? <CircularProgress/> :
                                <List>
                                    {
                                        conversationState.conversations.map(element => {
                                            return <ListItem disablePadding key={element.id}>
                                                <ListItemButton onClick={() => handleStartChat({
                                                    email: element.creator === user.email ? element.receiver : element.creator,
                                                    id: element.creator === user.email ? element.receiverId : element.creatorId
                                                })}>
                                                    <ListItemText> {element.creator === user.email ? element.receiver : element.creator} </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        })
                                    }
                                </List>

                        }
                    </Box> :
                    <Box pt={2} display={"flex"} flexDirection={"column"} alignItems={"center"}
                         justifyContent={"center"}>
                        <TextField variant={"outlined"} placeholder={"Search"}/>
                        {
                            contactState.loading ? <CircularProgress/> :
                                <List>
                                    {
                                        contactState.persons.map(element => {
                                            return <ListItem disablePadding key={element.id}>
                                                <ListItemButton onClick={() => handleStartChat({
                                                    email: element.email,
                                                    id: element.id
                                                })}>
                                                    <ListItemText> {element.email} </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        })
                                    }
                                </List>

                        }
                    </Box>
            }
        </Box>
    </Box>
}