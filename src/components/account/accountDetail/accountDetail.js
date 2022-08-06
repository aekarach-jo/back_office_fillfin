import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function AccountDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [memberCode, setMemberCode] = useState(query.get('member_code'))
    const [memberDetail, setMemberDetail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    useEffect(() => {
        apiGetMember()
    }, [])

    async function apiGetMember() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/member/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.data);
            if (res.data.status) {
                for (let member of res.data.data) {
                    if (memberCode == member.member_code) {
                        setMemberDetail(member)
                    }
                }
            }
        })
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }


    function handleChangePassword() {
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'warning',
                position: 'center',
                title: 'รหัสผ่านไม่ถูกต้อง',
                showConfirmButton : false,
                timer: 1000
            })
            return false;
        }

        Swal.fire({
            title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#C93A87",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                apiChangePassword()
            }
        })
    }

    async function apiChangePassword() {
        // await axios({
        //     method: 'POST',
        //     url: `${apiUrl}/api/admin/content/update`,
        //     headers: {
        //         Authorization: `Bearer ${access_token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     data: JSON.stringify({
        //         id: id,
        //         title: title,
        //         h1: h1,
        //         h2: h2,
        //         type: type,
        //         content: content,
        //         image_link: imageLink
        //     })
        // }).then(res => {
        //     Toast.fire({
        //         icon: 'success',
        //         title: 'แก้ไขแล้ว'
        //     })
        // })
    }

    return (
        <div className="h-screen flex-1 p-7 pt-12 max-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold ">Change Password</h1>
            <div className="relative m-3 text-left gap-2 flex align-middle ">
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to account</p>
                </button>
            </div>
            <div className="overflow-x-auto relative mt-5 border-2 rounded-lg  max-w-[1100px] mx-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Gender
                            </th>
                            <th scope="col" className="py-3 px-6">
                                createdAt
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberDetail &&
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {memberDetail.id}
                                </th>
                                <td className="py-2 px-6">
                                    {memberDetail.username}
                                </td>
                                <td className="py-2 px-6">
                                    {memberDetail.gender}
                                </td>
                                <td className="py-2 px-6">
                                    <FormatDate dateTime={memberDetail.createdAt} />
                                </td>
                                <td className="py-2 px-6">
                                    <div className="flex flex-row justify-center">
                                        <button type="button" className="gap-2 flex text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-red-900">
                                            <i className="my-auto fa-solid fa-circle-minus"></i>
                                            แจ้งปัญหา</button>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className="flex flex-col items-center   py-10 px-5 flex-wrap bg-emerald-200/20 ">
                    <form className="">
                        <h2 className="text-left block mt-2 font-bold text-gray-900 dark:text-gray-300"
                        >Password</h2>
                        <input
                            type="text"
                            defaultValue={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 w-full border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <h2 className="text-left block mt-2 font-bold text-gray-900 dark:text-gray-300"
                        >Confirm Password</h2>
                        <input
                            type="text"
                            defaultValue={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)
                            }
                            className="bg-gray-50 w-full border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                        focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </form>
                    <div className="flex flex-row justify-center pt-10">
                        <button 
                        onClick={() => handleChangePassword()}
                        type="button" 
                        className="gap-2 flex text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-red-900">
                            <i className="my-auto fa-solid fa-repeat"></i>
                            เปลี่ยนรหัสผ่าน</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
