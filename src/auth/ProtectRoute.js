import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { appAction } from '../store/app-slice'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import axios from 'axios';

function useAuth() {
    const dispatch = useDispatch()
    dispatch(appAction.checkToken())
    const access_token = useSelector((state) => (state.app.access_token))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const refresh_token = useSelector((state) => (state.app.refresh_token))
    if (access_token) {
        setInterval(() => {
            const acc = jwt_decode(access_token)
            const tokenExpirationTimeInSeconds = (acc.exp - moment(Math.floor(Date.now() / 1000)));
            console.log(tokenExpirationTimeInSeconds);
            if (tokenExpirationTimeInSeconds < 20) {
                console.log('time out');
                return RefreshToken(apiUrl, refresh_token)
            }
        }, 10000)
    }
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
            localStorage.setItem('access_token', res.data.token)
            return true;
        })
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const ProtectRoute = (props) => {
    const auth = useAuth()
    return auth ? <Outlet to='/' /> : <Navigate to='/login' />
}

export default ProtectRoute;