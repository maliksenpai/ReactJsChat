import logo from './logo.svg';
import './App.css';
import {createContext, useEffect, useState} from "react";
import {app} from "./index";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useNavigate} from "react-router";
import {LoginPage} from "./page/LoginPage";
import {MainPage} from "./page/MainPage";
import {CircularProgress} from "@mui/material";

export const UserContext = createContext();

function App() {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState()
    const navigator = useNavigate()

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setUser(user)
            if(!user){
                navigator("/login")
            }
            setLoading(false)
        })
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
          {
            loading ? <CircularProgress /> : <Routes>
                <Route path={"/*"} element={<MainPage />}/>
                <Route path={"/login"} element={<LoginPage/>}/>
            </Routes>
          }
        </UserContext.Provider>
    );
}

export default App;
