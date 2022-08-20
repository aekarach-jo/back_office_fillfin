import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { appAction } from '../store/app-slice'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import axios from 'axios';
import { useState } from 'react';

const RefreshToken = async(apiUrl, refresh_token) => {
    let token;
    try {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/getToken`,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ token: refresh_token })
        }).then(res => {
            localStorage.setItem('accessToken', res.data.token)
            token = res.data.token;
        })
    }
    catch (err) {
        token = false
    }
    return token;
}

const ProtectRoute = (props) => {
    const dispatch = useDispatch()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const isLogin = useSelector((state) => (state.app.isLogin))
    const refresh_token = useSelector((state) => (state.app.refresh_token))
    const [isFetching , setIsFetching] = useState(false)

    useEffect( ()=> {
        if(refresh_token) {
            if(!isFetching){
                const checkAccess = setInterval( async () => {
                    const accessToken = localStorage.getItem('accessToken')
                    const acc = jwt_decode(accessToken)
                    const expiredTime = (acc.exp - moment(Math.floor(Date.now() / 1000)));
                    if (expiredTime < 30 && !isFetching) {
                        clearInterval(checkAccess)
                        const token = await RefreshToken(apiUrl, refresh_token) 
                        if(token) {
                            setIsFetching(true)
                        } else {
                            dispatch(appAction.logout())
                        }
                    }
                }, 1000)
            }
            if(isFetching) {
                dispatch(appAction.checkToken())
                setIsFetching(false)
            }
        }
    },[isFetching, isLogin])
    return isLogin ? <Outlet to='/' /> : <Navigate to='/login' />
}

export default ProtectRoute;