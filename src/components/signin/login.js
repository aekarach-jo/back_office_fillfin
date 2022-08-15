import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { appAction } from "../../store/app-slice";

export default function Login() {
  const apiUrl = useSelector((state) => (state.app.apiPath))

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("aekadmin")
  const [password, setPassword] = useState("aekadmin")

  useEffect(() => {
  }, [])


  async function handleLogin() {
    try {
      await axios({
        method: 'POST',
        url: `${apiUrl}/api/admin/signin`,
        data: {
          username: username,
          password: password
        }
      }).then(res => {
        if (res.data.status) {
          dispatch(appAction.login({
            isLogin: true,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          }))
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          navigate('/');
        }
      })
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status == 401) {
        Swal.fire({
          icon: 'warning',
          position: 'center',
          title: 'รอแอดมินตรวจสอบ',
          timer: 1500,
          showConfirmButton: false
        })
      } else if(err.response.status == 404){
        Swal.fire({
          icon: 'warning',
          position: 'center',
          title: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          timer: 1500,
          showConfirmButton: false
        })
      }
    }
  }


  return (
    <div className="grid grid-cols-1 h-screen relative" >
      <div className="block">
        <img
          className="imageBg absolute mix-blend-overlay w-full h-full object-cover "
          src="./assets/background/art2.jpg"
          alt="login-bg"
        />
      </div>
      <div className=" lg:ml-10 lg:w-[30%] sm:rounded-lg sm:h-screen md:rounded-sm lg:rounded-lg lg:my-40 bg-gray-800 flex flex-col justify-center ">
        {/* <div className="4xl:rounded-l-full lg:rounded-full mx-20 bg-gray-800  "> */}
        <form className="relative max-w-[380px] w-full mx-auto p-8 px-8 rounded-lg  contrast-200">
          <h2 className="text-4xl text-white font-bold text-center">
            เข้าสู่ระบบ
          </h2>
          <div className="flex flex-col text-gray-100 py-2">
            <label className="text-start ml-2">User name</label>
            <input
              type="text"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              className=" rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-100 py-2">
            <label className="text-start ml-2">Password</label>
            <input
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
            />
          </div>
          {/* <a className="flex flex-col text-white text-rigth align-center text-sm mt-1">
            ลืมรหัสผ่าน?
          </a> */}
          <button
            type="button"
            style={{ boxShadow: "-2px 10px 17px 0px rgb(255 139 142 / 20%" }}
            className="shadow-transparent rounded-lg w-full my-5 py-2 bg-pink-700 font-bold text-white hover:bg-pink-900 hover:boder hover:boder-white"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <a className="text-white hover:text-blue hover:text-gray-400" href="/register">
            sign up?
          </a>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}
