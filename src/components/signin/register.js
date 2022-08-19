import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const apiUrl = useSelector((state) => (state.app.apiPath))
  const navigate = useNavigate()
  const inputImage = useRef([])
  const [image, setImage] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
  }, [])

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  async function handleRegis() {
    const formData = new FormData()
    formData.append("image", inputImage.current.files[0])
    formData.append("username", username)
    formData.append("password", password)
    formData.append("name", name)
    formData.append("email", email)
    try {
      await axios({
        method: 'POST',
        url: `${apiUrl}/api/admin/register`,
        data: formData
      }).then(res => {
        if (res.data.status) {
          Toast.fire({
            icon: 'success',
            title: 'สมัครแล้ว'
          })
          navigate('/login');
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  function inputImageOnChange(e, name) {
    if (!e.target.files.length) {
      return false;
    }
    if (
      ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)
    ) {
      const URLs = URL.createObjectURL(e.target.files[0]);
      setImage(URLs);
    } else {
      Swal.fire({
        title: "กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ",
        icon: "warning",
        position: "center",
        timer: 1000,
        showConfirmButton: false
      });
    }
  }

  return (
    <div className="grid grid-cols-1  h-screen w-full">
      <img
        className="imageBg absolute mix-blend-overlay w-full h-full object-cover "
        src="./assets/background/leaf.jpg"
        alt="leaf"
      />
      <div className=" lg:mx-auto lg:w-[40%] sm:rounded-lg sm:h-screen md:rounded-sm lg:rounded-lg lg:my-auto bg-gray-800 flex flex-col justify-center ">
        {/* <div className="4xl:rounded-l-full lg:rounded-full mx-20 bg-gray-800  "> */}
        {/* <div className="basis-2/4 my-auto">
            <div className="text-white relative max-w-[180px] mx-auto w-full my-auto rounded-full">
              {image.length > 0
                ? (
                  <img
                    className="rounded-full cursor-pointer min-w-[180px] min-h-[180px]"
                    alt="first"
                    src={image}
                    onClick={() => inputImage.current.click()}
                  />
                ) : (
                  <div className="cursor-pointer" onClick={() => inputImage.current.click()}>
                    <i className="text-5xl fa-regular fa-image cursor-pointer"></i>
                  </div>
                )}
              <input
                type="file"
                className="cursor-pointer"
                style={{ display: 'none', }}
                accept=".jpg,.jpeg,.png,.webp"
                ref={inputImage}
                onChange={(e) => inputImageOnChange(e)}
              />
              <p className="mt-2">เพิ่มภาพโปรไฟล์</p>
            </div>
          </div> */}
        <div className="basis-2/4">
          <form className="relative max-w-[380px] w-full mx-auto p-8 px-8 rounded-lg  contrast-200">
            <h2 className="text-4xl text-white font-bold text-center">
              สมัครสมาชิก
            </h2>
            <div className="flex flex-col text-gray-100 py-2">
              <label className="text-start ml-2">name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
              />
            </div>
            <div className="flex flex-col text-gray-100 py-2">
              <label className="text-start ml-2">email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
              />
            </div>
            <div className="flex flex-col text-gray-100 py-2">
              <label className="text-start ml-2">User name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className=" rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
              />
            </div>
            <div className="flex flex-col text-gray-100 py-2">
              <label className="text-start ml-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
              />
            </div>

            <button
              style={{ boxShadow: "-2px 10px 17px 0px rgb(255 139 142 / 20%" }}
              onClick={() => handleRegis()}
              type="button"
              className="shadow-transparent rounded-lg w-full my-5 py-2 bg-pink-700 font-bold text-white hover:bg-pink-900 hover:boder hover:boder-white"
            >
              REGISTER
            </button>
            <a className="text-white hover:text-gray-400" href="/login">
              already have an account?
            </a>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
