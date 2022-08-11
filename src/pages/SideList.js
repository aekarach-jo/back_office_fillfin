import { Menu } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appAction } from '../store/app-slice';

const Menus = [
    { title: "Dashboard", route: '/', fa: "fa-solid fa-house-chimney" },
    { title: "Content", route: '/content', fa: "fa-solid fa-book" },
    { title: "Manage-Account", gap: true, route: '/account', fa: "fa-solid fa-address-card" },
    { title: "Manage-order", route: '/order', fa: "fa-solid fa-border-all" },
    { title: "Manage-Store", route: '/store/?gender=men', fa: "fa-solid fa-shop" },
    { title: "Manage-Review", route: '/review', fa: "fa-solid fa-regular fa-star" },
    { title: "Manage-Bank", route: '/bank', fa: "fa-solid fa-money-check-dollar" },
    { title: "Manage-Package", route: '/package', fa: "fa-solid fa-box-open" },
    { title: "Manage-Payment", route: '/payment', fa: "fa-solid fa-dollar" },
    { title: "Live Chat", route: '/livechat', fa: "fa-solid fa-chart-bar" },
    { title: "Setting", route: '/setting', fa: "fa-solid fa-screwdriver-wrench", gap: true },
];

function SideList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
    const [select, setSelect] = useState(localStorage.getItem('sideMenuSelect'))

    useEffect(() => {
    }, [])

    function router(index, route) {
        setSelect(index)
        navigate(route)
    }

    function logout() {
        dispatch(appAction.logout())
        window.location.reload()
    }

    return (
        <>
            <div className={`${open ? "w-72" : "w-20"} hide-sidebar-sm:hidden collapse-sidebar-md:w-20 bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
                {Menu.title
                    ? <img
                        src="./assets/control.png"
                        alt="control"
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple  duration-300
             border-2 rounded-full  ${!open && "rotate-180"} collapse-sidebar-md:rotate-180`}
                        onClick={() => setOpen(!open)}
                    />
                    : <img
                        src="../../assets/control.png"
                        alt="control"
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple  duration-300
             border-2 rounded-full  ${!open && "rotate-180"} collapse-sidebar-md:rotate-180`}
                        onClick={() => setOpen(!open)}
                    />
                }


                <div className="flex gap-x-4 items-center ">
                    {Menu.title
                        ? <img
                            src="./assets/logo-fillfin.png"
                            alt="logo"
                            className={`bg-pink-500 cursor-pointer duration-500 w-20 
                            ${open && "rotate-[360deg]"} collapse-sidebar-md:rotate-[360deg]`}
                        />
                        : <img
                            src="../../assets/logo-fillfin.png"
                            alt="logo"
                            className={`bg-pink-500 cursor-pointer duration-500 w-20 
                            ${open && "rotate-[360deg]"} collapse-sidebar-md:rotate-[360deg]`}
                        />
                    }
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 
                        ${!open && "scale-0"} collapse-sidebar-md:scale-0`}
                    >
                        Back Office
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-lg collapse-sidebar-md p-2 cursor-pointer hover:bg-[#f0f8ff] hover:text-pink-600 text-gray-300 text-sm items-center gap-x-4  duration-300
                            ${Menu.gap ? "mt-9" : "mt-2"} 
                            ${index == select && "bg-[#f0f8ff] text-pink-600"} `}
                            onClick={() => (router(index, Menu.route), localStorage.setItem('sideMenuSelect', index))}
                        >
                            <i className={`${Menu.fa} ${index == select && " text-pink-600"} w-[14px] `} ></i>
                            <span className={`${!open && "hidden"} collapse-sidebar-md:hidden origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                    <li
                        className="flex  rounded-collapse-sidebar-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
                        onClick={() => logout()}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className={`${!open && "hidden"} collapse-sidebar-md:hidden origin-left duration-200`}>
                            Logout
                        </span>
                    </li>
                </ul>
            </div>

        </>
    );
}

export default SideList