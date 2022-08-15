import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [adminCode, setAdminCode] = useState(query.get('code'))
    const [adminList, setAdminList] = useState([])

    useEffect(() => {
        apiGetOrder()
        console.log(adminCode);
    }, [])

    async function apiGetOrder() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            if (res.data.status) {
                console.log(res.data);
                for (let admin of res.data.admin) {
                    if (adminCode == admin.adminCode) {
                        setAdminList(admin)

                    }
                }
            }
        })
    }

    function apiReportOrder() {
        Swal.fire({
            title: 'แจ้งบัญหา',
            html: `<textarea placeholder="หมายเหตุ" class="border-2" type="text" style="padding: 0.7rem ;border-radius: 10px ; width: 90%" id="message"/>`,
            showCancelButton: true,
            confirmButtonText: 'แจ้งปัญหา',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#ff0303",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                if (document.getElementById("message").value.trim() == "") {
                    return false;
                }
                return document.getElementById("message").value.trim()
            }
        }).then((result) => {
            if (result.isConfirmed) {

            } else {
                return false;
            }
        })
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }

    return (
        <div className="h-screen flex-1 p-4 pt-12 max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            <div className="relative m-3 text-left gap-2 flex align-middle ">
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to order</p>
                </button>
            </div>
            <div className="overflow-x-auto relative mt-5 border-2 rounded-lg  max-w-[1100px] mx-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                createdAt
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                permission
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                status
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminList &&
                            <Fragment >
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-2 px-6">{adminList.username}</td>
                                    <td className="py-2 px-6">{adminList.email}</td>
                                    <td className="py-2 px-6">
                                        <FormatDate dateTime={adminList.createdAt} />
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <p
                                            className={`
                                                    ${adminList.statusConfirm === "confirm" &&
                                                "text-green-600 text-center"
                                                }
                                                    ${adminList.statusConfirm === "pending" &&
                                                "text-yellow-500 text-center"
                                                }
                                                    text-md font-semibold`}
                                        >
                                            {adminList.statusConfirm}
                                        </p>
                                    </td>
                                    <td className="py-2 px-6 text-center">{adminList.permission}</td>
                                    <td className="py-2 px-6">
                                        <div className="flex flex-row justify-center gap-2">
                                            <button
                                                type="button"
                                                className={`
                                       ${adminList.statusConfirm === 'pending' && 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300 dark:focus:ring-yellow-900'}
                                       ${adminList.statusConfirm === 'confirm' && 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:focus:ring-green-900'}
                                       
                                        focus:outline-none focus:ring-4 
                                        font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2  `}
                                            >
                                                จัดการ
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </Fragment>
                        }
                    </tbody>
                </table>

                <div className="flex justify-center gap-5 py-10 flex-wrap bg-emerald-200/20 ">

                </div>
            </div>
        </div >
    )
}
