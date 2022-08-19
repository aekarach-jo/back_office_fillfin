import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import st from '../../../styles/account/accountDetail.module.scss'
import { Listbox, Transition } from '@headlessui/react';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

const formStatusMember = [
    { id: 0, statusMember: 'active' },
    { id: 1, statusMember: 'inactive' },
    { id: 2, statusMember: 'banned' },
]
export default function AccountDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [memberCode, setMemberCode] = useState(query.get('member_code'))
    const [memberDetail, setMemberDetail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [selectStatus, setSelectStatus] = useState()
    const [statusList, setStatusList] = useState(formStatusMember)
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
                        setSelectStatus({ statusMember: member.statusMember })
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
                showConfirmButton: false,
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
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/member/changePassword`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                memberCode: memberCode,
                newPassword: password
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }

    async function handleChangeMemberStatus(memberStatus) {
        console.log(memberStatus);
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/member/changeStatus`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                memberCode: memberCode,
                status: memberStatus
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }

    function handleDeleteMember() {
        Swal.fire({
            title: 'ยืนยันการลบบัญชี ' + memberDetail.username,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#C93A87",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                apiDeleteMember()
            }
        })
    }

    async function apiDeleteMember() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/member/delete/${memberCode}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        }).then(() => {
            Toast.fire({
                icon: 'success',
                title: 'ลบแล้ว'
            })
            navigate('/account')
        })
    }

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <h1 className="text-2xl font-semibold ">Change Password</h1>
            <div className={st.wrapBtnBack}>
                <button onClick={() => navigate(-1)} >
                    <i className="fa-solid fa-circle-arrow-left" ></i>
                    <p>Back to account</p>
                </button>
            </div>
            <div className={st.contentTable}>
                <table>
                    <thead>
                        <tr>
                            <th scope="col"> ID </th>
                            <th scope="col"> ชื่อผู้ใช้ (username) </th>
                            <th scope="col"> เพศ </th>
                            <th scope="col"> วันที่สมัครสมาชิก </th>
                            <th scope="col">เพิ่มเติม </th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberDetail &&
                            <tr>
                                <td>{memberDetail.id}</td>
                                <td>{memberDetail.username}</td>
                                <td>{memberDetail.gender} </td>
                                <td > <FormatDate dateTime={memberDetail.createdAt} /> </td>
                                <td>
                                    <div className={st.report}>
                                        <button
                                            type="button"
                                            className=""
                                            onClick={() => handleDeleteMember()}
                                        >
                                            <i className="my-auto fa-solid fa-circle-minus"></i>
                                            ลบบัญชีผู้ใช้</button>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className={st.contentBottom}>
                    <div className={st.contentChangeStatus}>
                        <p>สถานะ</p>
                        <Listbox value={selectStatus} onChange={setSelectStatus}>
                            {selectStatus &&
                                <div className={st.contentList}>
                                    <Listbox.Button className={`${st.btnList} 
                                ${selectStatus.statusMember == 'active' && 'bg-green-500/50'}
                                ${selectStatus.statusMember == 'inactive' && 'bg-yellow-500'}
                                ${selectStatus.statusMember == 'banned' && 'bg-red-500'}
                                `}>
                                        <span className={`block truncate text-left`}>{selectStatus.statusMember}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <i className="animate-bounce fa-solid fa-arrow-down"></i>
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {statusList?.map((data) => (
                                                <Listbox.Option
                                                    key={data.id}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none p-2 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={data}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate align-left ${selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                                onClick={() => handleChangeMemberStatus(data.statusMember)}
                                                            >
                                                                {data.statusMember}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                                                                    <i className="fa-solid fa-check"></i>
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            }
                        </Listbox>
                    </div>
                    <div className={st.contentChangePass}>
                        <form className="">
                            <p>Password</p>
                            <input
                                type="text"
                                defaultValue={password}
                                maxLength={15}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p>Confirm Password</p>
                            <input
                                type="text"
                                defaultValue={confirmPassword}
                                maxLength={15}
                                onChange={(e) => setConfirmPassword(e.target.value)
                                }
                            />
                        </form>
                        <div className={st.wrapBtnChangePass}>
                            <button onClick={() => handleChangePassword()} type="button" >
                                <i className="my-auto fa-solid fa-repeat"></i>
                                เปลี่ยนรหัสผ่าน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
