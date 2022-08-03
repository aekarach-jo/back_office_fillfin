import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { appAction } from '../store/app-slice'

const useAuth = () => {
    const dispatch = useDispatch()
    dispatch(appAction.checkToken())
    const access_token = useSelector((state) => (state.app.access_token))
    if (access_token) {
        return true;
    } else {
        return false;
    }
}

const ProtectRoute = (props) => {
    const auth = useAuth()
    return auth ? <Outlet to='/'/> : <Navigate to='/login' />
}

export default ProtectRoute;