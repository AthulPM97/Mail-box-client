import { createSlice } from "@reduxjs/toolkit";

//const processedEmail = email.replace("@", "").replace(".", "")
const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        inbox: [],
    },
    reducers: {
        send(state,action) {

        }
    }
})