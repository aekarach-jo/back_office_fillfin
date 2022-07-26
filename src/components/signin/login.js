import React, { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    changeBg()
  },[])

  function changeBg() {
    const images = [
      "./assets/background/login.jpg",
      "./assets/background/sunset.png",
      "./assets/background/trees.jpg",
    ];

    const img = document.querySelector(".imageBg");
    const bg = images[Math.floor(Math.random() * images.length)];

    img.src = bg;
  }
  setInterval(changeBg, 10000);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="sm:block">
        <img
          className="imageBg absolute mix-blend-overlay w-full h-full object-cover "
          src="./assets/sunset.png"
          alt="sunset"
        />
      </div>
      <div className="4xl:rounded-t-full lg:rounded-l-full my-9 bg-gray-600 flex flex-col justify-center ">
        {/* <div className="4xl:rounded-l-full lg:rounded-full mx-20 bg-gray-800  "> */}
        <form className="relative max-w-[380px] w-full mx-auto p-8 px-8 rounded-lg  contrast-200">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            เข้าสู่ระบบ
          </h2>
          <div className="flex flex-col text-gray-100 py-2">
            <label className="text-start ml-2">User name</label>
            <input
              type="text"
              className=" rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
            />
          </div>
          <div className="flex flex-col text-gray-100 py-2">
            <label className="text-start ml-2">Password</label>
            <input
              type="password"
              className="rounded-lg bg-gray-600 mt-2 p-2 focus:border-pink-500 focus:bg-white-800 focus:outline-none"
            />
          </div>
          <p className="flex text-white text-left align-center text-sm mt-1">
            <input className="mr-2 checked:bg-pink-500" type="checkbox" />{" "}
            จดจำรหัสผ่าน
          </p>
          <button
            style={{ boxShadow: "-2px 10px 17px 0px rgb(255 139 142 / 20%" }}
            className="shadow-transparent rounded-lg w-full my-5 py-2 bg-pink-700 font-bold text-white hover:bg-pink-900 hover:boder hover:boder-white"
          >
            Sign In
          </button>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
}
