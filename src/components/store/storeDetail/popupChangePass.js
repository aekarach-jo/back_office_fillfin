import { Dialog, Listbox, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
})

export default function PopupChangePass({ onSetOpen }) {
    const query = new URLSearchParams(useLocation().search);
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [storeCode, setStoreCode] = useState(query.get('storeCode'))
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

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
            url: `${apiUrl}/api/admin/store/changePassword`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                storeCode: storeCode,
                newPassword: password
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
            onSetOpen()
        })
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onSetOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h2"
                                    className="pb-4 text-lg leading-6 text-gray-900"
                                >
                                    เปลี่ยนรหัสผ่าน
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form className="w-full max-w-sm">
                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-2/4">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                    password
                                                </label>
                                            </div>
                                            <div className="md:w-2/4">
                                                <input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                                    type="text"
                                                    maxLength={15}
                                                    defaultValue={password} />
                                            </div>
                                        </div>
                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-2/4">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Confirm password
                                                </label>
                                            </div>
                                            <div className="md:w-2/4">
                                                <input
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                                                    type="text"
                                                    maxLength={15}
                                                    defaultValue={confirmPassword} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className='flex flex-col items-center mx-auto w-[40%]'>
                                    <button
                                        className=' text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-red-900'
                                        onClick={() => handleChangePassword()}
                                        type="button" >
                                        <i className="my-auto fa-solid fa-repeat"></i>
                                        เปลี่ยนรหัสผ่าน
                                    </button>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
