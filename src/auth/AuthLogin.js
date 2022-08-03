import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { appAction } from '../../store/app-slice'
import { useDispatch } from 'react-redux'

function AuthLogin() {
  const dispatch = useDispatch()
  const api = useSelector((state) => (state.app.apiPath))
  const isLogin = useSelector((state) => (state.app.login))

  useEffect(() => {
  }, [isLogin])

  function onClickLogin() {
    dispatch(appAction.login())
  }
  function onClickLogout() {
    dispatch(appAction.logout())
  }
  async function checkAuth() {
  }
  return (
    <>
      <button onClick={onClickLogin}>Login</button><br />
      <button onClick={onClickLogout}>Logout</button>
    </>
  )
}

export default AuthLogin