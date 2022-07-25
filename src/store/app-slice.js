import { createSlice } from "@reduxjs/toolkit";


const initialAppState ={
    apiPath : 'https://192.168.1.54:3000/api',
    login : false
}

const appSlice = createSlice({
    name : 'app',
    initialState : initialAppState,
    reducers : {
        login(state, action){
            state.login = true
        },
        logout(state, action){
            state.login = false
        }
    }
})

export const appAction = appSlice.actions;
export default appSlice;