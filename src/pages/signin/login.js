import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { appAction } from '../../store/app-slice'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import './scss/login.scss'

export default function Login() {
  const dispatch = useDispatch()
  const api = useSelector((state) => (state.app.apiPath))
  const isLogin = useSelector((state) => (state.app.login))

  useEffect(() => {
    console.log(isLogin)
  }, [isLogin])

  function onClickLogin() {
    // if login success
    dispatch(appAction.login())
  }
  function onClickLogout() {
      // if logout success
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
    <div >
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '20vh' }} />
        <Button
          variant="contained"
          size="medium"
          onClick={onClickLogin}
          sx={{ bgcolor: '#357a38', }}>
          LOGIN
        </Button>
        <Button
          variant="contained"
          size="medium"
          onClick={onClickLogin}
          sx={{ bgcolor: '#a15fa9', }}>
          REGISTER
        </Button>
      </Container>
    </div>
  )
}

