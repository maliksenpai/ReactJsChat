import {createSlice} from "@reduxjs/toolkit";
import {getInitialContacts} from "./ContactActions";

const initialState = {
    persons: [],
    loading: false,
}

export const contactReducer = createSlice({
    name: "contactReducer",
    initialState: initialState,
    reducers: {
        initContact: (state, action) => {
            const copyState = {...state}
            const persons = []
            action.payload.forEach(element => {
                persons.push(element.val())
            })
            copyState.persons = persons
            return copyState
        },
        addContact: (state, action) => {
            const copyState = {...state}
            const persons = [...copyState.persons]
            persons.push(action.payload)
            copyState.persons = persons
            return copyState
        },
        updateContact: (state, action) => {
            const copyState = {...state}
            const persons = [...copyState.persons]
            const personIndex = persons.findIndex(element => element.id === action.payload.val().id)
            persons[personIndex] = action.payload.val()
            copyState.persons = persons
            return copyState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInitialContacts.pending, (state, action) => {
            const copyState = {...state}
            copyState.loading = true
            copyState.persons = []
            return copyState
        })
        builder.addCase(getInitialContacts.fulfilled, (state, action) => {
            const copyState = {...state}
            copyState.loading = false
            copyState.persons = action.payload.response
            return copyState
        })
    }
})