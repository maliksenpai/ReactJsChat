import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import reportWebVitals from './reportWebVitals';
import {ReactValidatableFormProvider} from "react-validatable-form";
import {applyMiddleware, createStore} from "redux";
import {MainReducer} from "./redux/MainReducer";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyBCXYOzXr1rkuJ0dwSymuxme1153yTa8u8",
    authDomain: "chatapp-c3f46.firebaseapp.com",
    projectId: "chatapp-c3f46",
    storageBucket: "chatapp-c3f46.appspot.com",
    messagingSenderId: "415902008091",
    appId: "1:415902008091:web:ae8dae3bd9768d858949be"
};

const store = createStore(MainReducer, applyMiddleware(thunk, logger))
export const app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <ReactValidatableFormProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ReactValidatableFormProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
