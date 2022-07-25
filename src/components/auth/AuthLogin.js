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
    console.log(isLogin)
  }, [isLogin])

  function onClickLogin() {
    dispatch(appAction.login())
  }
  function onClickLogout() {
    dispatch(appAction.logout())
  }
  async function checkAuth() {
    const access_token = localStorage.getItem("access_token")
    const check = await axios({
      method: 'GET',
      url: `${api}`
    })
  }
  return (
    <>
      <button onClick={onClickLogin}>Login</button><br />
      <button onClick={onClickLogout}>Logout</button>
    </>
  )
}

export default AuthLogin