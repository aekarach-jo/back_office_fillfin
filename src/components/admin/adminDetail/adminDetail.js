import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import st from '../../../styles/account/accountDetail.module.scss'

export default function AdminDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [adminCode, setAdminCode] = useState(query.get('code'))
    const [adminList, setAdminList] = useState([])

    useEffect(() => {
        apiGetOrder()
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
        <div className={st.content}>
            <div className={st.wrapBtnBack}>
                <button onClick={() => navigate(-1)}>
                    <i className=" fa-solid fa-circle-arrow-left" ></i>
                    <p>Back to admin</p>
                </button>
            </div>
            <div className={st.contentTable}>
                <table >
                    <thead >
                        <tr>
                            <th scope="col"> ชื่อผู้ใช้ </th>
                            <th scope="col"> อีเมลล์ </th>
                            <th scope="col"> วันที่สมัคร </th>
                            <th scope="col"> สิทธิ์ </th>
                            <th scope="col">สถานะ</th>
                            <th scope="col">เพิ่มเติม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminList &&
                            <Fragment >
                                <tr>
                                    <td>{adminList.username}</td>
                                    <td>{adminList.email}</td>
                                    <td><FormatDate dateTime={adminList.createdAt}/></td>
                                    <td>
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
