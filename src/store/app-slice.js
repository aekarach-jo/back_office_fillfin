import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
    apiPath: 'http://192.168.1.54:8000',
    isLogin: false,
    access_token: null,
    refresh_token: null
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        login(state, action) {
            state.isLogin = true
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token


            // if (initialAppState.access_token == null) {
            //     state.isLogin = true
            //     state.access_token = access_token
            //     state.refresh_token = refresh_token
            // }
        },
        logout(state, action) {
            state.isLogin = false
            state.access_token = ''
            state.refresh_token = ''
            localStorage.clear()
        },
        checkToken(state, action) {
            state.isLogin = true
            state.access_token = localStorage.getItem('access_token')
            state.refresh_token = localStorage.getItem('refresh_token')
        }

    }
})


export const appAction = appSlice.actions;
export default appSlice;