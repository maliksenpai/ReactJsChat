import {app} from "../index";

const databaseUrl = process.env.REACT_APP_firebase_database_url

export async function getInitialContactsData({email}) {
    const db = app.firestore().collection("users")
    const response = await db.where("email", "!=", email).get()
    return response.docs
}

export function addUserDatabase({user}) {
    app.database(databaseUrl).ref().child("contact").push(user)
}