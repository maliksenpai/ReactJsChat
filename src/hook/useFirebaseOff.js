import {app} from "../index";
import {useEffect} from "react";

export function useFirebaseOff({firebase, child}) {
    useEffect(() => {
        firebase.child(child).off();
    }, [])
}