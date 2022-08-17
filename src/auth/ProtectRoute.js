import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { appAction } from '../store/app-slice'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import axios from 'axios';

function useAuth() {
    const dispatch = useDispatch()
    dispatch(appAction.checkToken())
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const refresh_token = useSelector((state) => (state.app.refresh_token))
    const access_token = useSelector((state) => (state.app.access_token))
    setInterval(() => {
        const accessToken = localStorage.getItem('accessToken')
        const acc = jwt_decode(accessToken)
        const runTimePerSecond = (acc.exp - moment(Math.floor(Date.now() / 1000)));
        // console.log(runTimePerSecond);
        if (runTimePerSecond < 30) {
            console.log('time out');
            RefreshToken(apiUrl, refresh_token)
            setTimeout(() =>{dispatch(appAction.checkToken()) },2000)  
            return true;
        }
    }, 5000)

    if (access_token) {
        return true;
    } else {
        return false;
    }
}

async function RefreshToken(apiUrl, refresh_token) {
    try {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/getToken`,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                token: refresh_token
            })
        }).then(res => {
            console.log(res);
            localStorage.setItem('accessToken', res.data.token)
        })
    }
    catch (err) {
        console.log(err);
        localStorage.setItem('accessToken', "")
        window.location.reload()
        return false;
    }
}

const ProtectRoute = (props) => {
    const auth = useAuth()
    return auth ? <Outlet to='/' /> : <Navigate to='/login' />
}

export default ProtectRoute;