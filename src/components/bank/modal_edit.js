import { Dialog, Listbox, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function Modal_edit({ bankData, onSetOpen }) {
    console.log(bankData);
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [image, setImage] = useState(bankData.image)
    const [name, setName] = useState(bankData.name)
    const [bankNumber, setBankNumber] = useState(bankData.bank_number)
    const [branch, setBranch] = useState(bankData.branch)
    const inputProfileImage = useRef([])
    const [imageObj, setImageobj] = useState(`${apiUrl}${image}`)
    const [selectBank, setSelectBank] = useState()

    useEffect(() => {
        apiGetBank()
    }, [])

    async function apiGetBank() {
        const access_token = localStorage.getItem('access_token')

        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/bankProvider/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res) => { setSelectBank(res.data.data) })
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

    async function onEditBank() {
        const formData = new FormData()
        const access_token = localStorage.getItem('access_token')
        formData.append('image', inputProfileImage.current.files[0])
        formData.append('name', name)
        formData.append('bank_number', bankNumber)
        formData.append('branch', branch)
        formData.append('bank_id', bankData.id)

        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/bank/update`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: formData
        }).then(() => {

            Swal.fire({
                icon: 'success',
                position: 'center',
                title: 'แก้ไขแล้ว',
                showConfirmButton: false,
                timer: 1000
            }).then(() => { onSetOpen() })

        })
    }
    return (
        <>
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
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
                                    </Dialog.Title>
                                    <div className="mt-2">
                                            <Listbox >
                                                <Listbox.Button></Listbox.Button>
                                                <Listbox.Options>
                                                    {selectBank?.map((data,index) => (
                                                        <Listbox.Option
                                                            key={index}
                                                            value={data.name}
                                                        >
                                                            {data.name}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Listbox>
                                    
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onSetOpen}
                                        >
                                            SAVE
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )

}
