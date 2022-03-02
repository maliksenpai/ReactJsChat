import {app} from "../index";
import {addUserDatabase} from "./contactFirebase";

export const loginUser = async ({email, password}) => {
    const auth = app.auth()
    const response = await auth.signInWithEmailAndPassword(email, password)

    return response
}

export const registerUser = async ({email, password}) => {
    const auth = app.auth()
    const response = await auth.createUserWithEmailAndPassword(email, password)
    const user = {
        email: email,
        id: response.user.uid,
    }
    addUserDatabase({user: user})
    return response
}

export const logoutUser = async () => {
    const auth = app.auth();
    await auth.signOut();
}
