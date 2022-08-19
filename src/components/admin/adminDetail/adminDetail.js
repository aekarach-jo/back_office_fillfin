import axios from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import st from '../../../styles/admin/adminDetail.module.scss'
import { Listbox, Transition } from '@headlessui/react';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

const formStatusAdmin = [
    { id: 0, statusAdmin: 'pending' },
    { id: 1, statusAdmin: 'active' },
    { id: 2, statusAdmin: 'inactive' },
    { id: 3, statusAdmin: 'banned' },
]
export default function AdminDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [adminCode, setAdminCode] = useState(query.get('code'))
    const [adminList, setAdminList] = useState([])
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [statusList, setStatusList] = useState(formStatusAdmin)
    const [selectStatus, setSelectStatus] = useState()
    const [formEditAdmin, setFormEditAdmin] = useState()
    const inputProfileImage = useRef([])
    const [imageObj, setImageobj] = useState()

    useEffect(() => {
        apiGetAdmin()
    }, [])

    async function apiGetAdmin() {
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
                    if (adminCode === admin.adminCode) {
                        setAdminList(admin)
                        setSelectStatus({ statusAdmin: admin.status })
                        setFormEditAdmin({
                            adminCode: admin.adminCode,
                            email: admin.email,
                            username: admin.username,
                            displayName: admin.displayName,
                            permission: admin.permission,
                            statusConfirm: admin.statusConfirm,
                            status: admin.status,
                            profileImg: admin.profileImg
                        })
                    }
                }
            }
        })
    }

    function inputImageOnChange(e) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)
        ) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setImageobj(URLs)
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

    function apiReportAdmin() {
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
                if (document.getElementById("message").value.trim() === "") {
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
        console.log(adminCode);
        console.log(password);
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/changePassword`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                adminCode: adminCode,
                newPassword: password
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }

    async function apiEditAdmin() {
        const formData = new FormData()
        if (inputProfileImage.current.files.length > 0) {
            formData.append('image', inputProfileImage.current.files[0])
        }
        formData.append('adminCode', formEditAdmin.adminCode)
        formData.append('email', formEditAdmin.email)
        formData.append('name', formEditAdmin.displayName)
        formData.append('permission', formEditAdmin.permission)
        formData.append('statusConfirm', formEditAdmin.statusConfirm)
        formData.append('status', formEditAdmin.status)
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/update`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: formData
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
            apiGetAdmin()
        })
    }

    async function handleChangeAdminStatus(adminStatus) {
        console.log(adminStatus);
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/changeStatus`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                adminCode: adminCode,
                status: adminStatus
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
            apiGetAdmin()
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
                            <th scope="col"> อีเมล </th>
                            <th scope="col"> วันที่สมัคร </th>
                            <th scope="col"> สิทธิ์ </th>
                            <th scope="col"> สถานะ</th>
                            <th scope="col"> เพิ่มเติม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminList &&
                            <Fragment >
                                <tr>
                                    <td>{adminList.username}</td>
                                    <td>{adminList.email}</td>
                                    <td><FormatDate dateTime={adminList.createdAt} /></td>
                                    <td className="py-2 px-6 text-center">{adminList.permission}</td>
                                    <td>
                                        <p className={`
                                                    ${adminList.status === "pending" && "text-yellow-500 text-center"}
                                                    ${adminList.status === "active" && "text-green-600 text-center"}
                                                    ${adminList.status === "inactive" && "text-orange-600 text-center"}
                                                    ${adminList.status === "banned" && "text-red-600 text-center"}
                                                    text-md font-semibold`}
                                        >
                                            {adminList.status}
                                        </p>
                                    </td>
                                    <td className="py-2 px-6">
                                        <div className="flex flex-row justify-center gap-2">
                                            <button
                                                type="button"
                                                className={`
                                                bg-pink-400 text-white hover:bg-pink-600 duration-100
                                        focus:outline-none focus:ring-4 
                                        font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2  `}
                                            >
                                                ตั้งค่า
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </Fragment>
                        }
                    </tbody>
                </table>

                <div className={st.contentBottom}>
                    <div className={st.contentUpdateProfile}>
                        {imageObj
                            ? <img
                                src={imageObj}
                                className='mx-auto mb-3 w-32 h-32 rounded-full shadow-lg'
                                alt="image-first"

                                onClick={() => inputProfileImage.current.click()}
                            />
                            : <>
                                {formEditAdmin &&
                                    <img src={`${apiUrl}${formEditAdmin.profileImg}`} alt="image"
                                        className='mx-auto mb-3 w-32 h-32 rounded-full shadow-lg'
                                        onClick={() => inputProfileImage.current.click()}
                                        onError={e => {
                                            e.target.setAttribute('src', '/assets/contact.jpg')
                                        }}
                                    />
                                }</>
                        }
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".jpg,.jpeg,.png,.webp"
                            ref={inputProfileImage}
                            onChange={(e) => inputImageOnChange(e)}
                        />
                        {formEditAdmin &&
                            <div className="mt-4">
                                <div className="w-full max-w-s ">
                                    <div className="flex flex-row mb-2 ">
                                        <div className="w-1/3">
                                            <label className="block text-left text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                ไอดี
                                            </label>
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                className="bg-white  border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                type="text"
                                                defaultValue={formEditAdmin.displayName}
                                                onChange={(e) => setFormEditAdmin({ ...formEditAdmin, displayName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row mb-2 ">
                                        <div className="w-1/3">
                                            <label className="block text-left text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                ชื่อแอดมิน
                                            </label>
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                className="bg-white  border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                type="text"
                                                defaultValue={formEditAdmin.username}
                                                onChange={(e) => setFormEditAdmin({ ...formEditAdmin, username: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div className="w-1/3">
                                            <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                อีเมล
                                            </label>
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                type="text"
                                                defaultValue={formEditAdmin.email}
                                                onChange={(e) => setFormEditAdmin({ ...formEditAdmin, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mb-2 ">
                                        <div className="w-1/3">
                                            <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                สิทธิ์แอดมิน
                                            </label>
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                type="text"
                                                value={formEditAdmin.permission}
                                                maxLength={1}
                                                onChange={(e) => {
                                                    if (
                                                        /^[1-3]+$/.test(
                                                            e.target.value.trim()
                                                        ) || e.target.value == ""
                                                    ) {
                                                        setFormEditAdmin({ ...formEditAdmin, permission: e.target.value.trim() })
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center m-2 dark:focus:ring-yellow-900"
                                        onClick={() => apiEditAdmin()}
                                    >แก้ไข</button>
                                    <hr className='' />
                                </div>
                            </div>}
                    </div>
                    <div className={st.contentChangePass}>
                        <div className={st.contentChangeStatus}>
                            <p>สถานะ</p>
                            <Listbox value={selectStatus} onChange={setSelectStatus}>
                                {selectStatus &&
                                    <div className={st.contentList}>
                                        <Listbox.Button className={`${st.btnList} 
                                ${selectStatus.statusAdmin === 'pending' && 'bg-blue-500/50'}
                                ${selectStatus.statusAdmin === 'active' && 'bg-green-500/50'}
                                ${selectStatus.statusAdmin === 'inactive' && 'bg-yellow-500'}
                                ${selectStatus.statusAdmin === 'banned' && 'bg-red-500'}
                                `}>
                                            <span className={`block truncate text-left`}>{selectStatus.statusAdmin}</span>
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
                                                                    onClick={() => handleChangeAdminStatus(data.statusAdmin)}
                                                                >
                                                                    {data.statusAdmin}
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
