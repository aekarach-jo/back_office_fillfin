import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SideList() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);
    const [select, setSelect] = useState(0)
    const Menus = [
        { title: "Dashboard", src: "Chart_fill", route: '/', fa: "fa-solid fa-house-chimney" },
        { title: "Content", src: "Chat", route: '/content', fa: "fa-solid fa-book" },
        { title: "Manage-Account", src: "User", gap: true, route: '/account', fa: "fa-solid fa-address-card" },
        { title: "Manage-Store", src: "Calendar", route: '/store', fa: "fa-solid fa-shop" },
        { title: "Manage-Review", src: "review", route: '/review', fa: "fa-solid fa-regular fa-star" },
        { title: "Analytics", src: "Chart", route: '/analytics', fa: "fa-solid fa-chart-bar"},
        { title: "Setting", src: "Setting", route: '/setting', fa: "fa-solid fa-screwdriver-wrench",gap: true},
    ];

    function router(index, route) {
        setSelect(index)
        navigate(route)
    }

    return (
        <>
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src="./assets/control.png"
                    alt="control"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="./assets/logo-fillfin.png"
                        alt="logo"
                        className={`cursor-pointer duration-500 w-20 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Back Office
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${Menu.gap ? "mt-9" : "mt-2"} ${index === select && "bg-light-white"
                                } `}
                            onClick={() => router(index, Menu.route)}
                        >
                            <i className={`${Menu.fa}`} style={{ color: '#fff' }}></i>
                            {/* <img src={`./assets/${Menu.src}.png`} alt="iconSrc" /> */}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}

export default SideList