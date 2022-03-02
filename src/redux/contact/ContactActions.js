import {createAsyncThunk} from "@reduxjs/toolkit";
import {getInitialContactsData} from "../../firebase/contactFirebase";

export const getInitialContacts = createAsyncThunk(
    "initialContacts",
    async ({email}) => {
        const response = await getInitialContactsData({email: email})
        return {
            response: response
        }
    }
)