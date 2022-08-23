import { Dialog, Listbox, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
})

export default function Modal_edit({ data, position, onSetOpen, apiGetContent }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const inputImage = useRef([])
    const [imageShow, setImageShow] = useState({})
    // const [imageFile, setImageFile] = useState([])
    const [selectPosition, setSelectPosition] = useState(position)

    useEffect(() => {
        setImageShow(apiUrl + data.img_path)
    }, [])

    function inputImageOnChange(e) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)
        ) {
            setImageShow(URL.createObjectURL(e.target.files[0]));
            // setImageFile(e.target.files[0])
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


    function handleClickUpload() {
        const formData = new FormData()
        formData.append("image", inputImage.current.files[0])
        formData.append("id", data.id)
        formData.append("position", selectPosition)

        Swal.fire({
            title: "ยืนยันการอัปโหลด",
            icon: "question",
            position: "center",
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#C93A87',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                uploadImage(formData)
            }
        })
    }

    async function uploadImage(formData) {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/updateSlide`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
        Toast.fire({
            icon: 'success',
            title: 'สำเร็จ'
        }).then(() => {
            apiGetContent()
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
                        <div className="flex min-h-full max-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl max-h-[85vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h2"
                                        className="pb-4 text-lg leading-6 text-gray-900"
                                    >
                                        แก้ไขโฆษณา
                                    </Dialog.Title>
                                    <form className="w-full">
                                        <div className='flex flex-col justify-center gap-3 items-center '>
                                            <div>
                                                {imageShow
                                                    ? (
                                                        <img
                                                            src={imageShow}
                                                            alt="image-second"
                                                            // className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
                                                            onClick={() => inputImage.current.click()}
                                                        />
                                                    ) : (
                                                        <div
                                                            // className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
                                                            onClick={() => inputImage.current.click()}>
                                                            <i className="text-4xl fa-regular fa-image"></i>
                                                        </div>
                                                    )}
                                                <input
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    accept=".jpg,.jpeg,.png,.webp"
                                                    ref={inputImage}
                                                    onChange={(e) => inputImageOnChange(e)}
                                                />
                                            </div>
                                            <div>
                                                <Listbox value={selectPosition} onChange={setSelectPosition}>
                                                    {selectPosition &&
                                                        <div className="relative mt-1">
                                                            <Listbox.Button className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500">
                                                                <span className="block truncate text-left mr-2">
                                                                    {data.position == "home" && 'หน้าหลัก'}
                                                                    {data.position == "login" && 'ร้านค้าผู้หญิง'}
                                                                    {data.position == "store-women" && 'ร้านค้าผู้หญิง'}
                                                                    {data.position == "store-men" && 'ร้านค้าผู้ชาย'}
                                                                </span>
                                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <i className=" fa-solid fa-arrow-down"></i>
                                                                </span>
                                                            </Listbox.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Listbox.Options className="absolute mt-1 max-h-60 w-[7rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                    {position?.map((data, index) => (
                                                                        <Listbox.Option
                                                                            key={index}
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none px-2 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                                                }`
                                                                            }
                                                                            value={data}
                                                                        >
                                                                            {({ selected }) => (
                                                                                <>
                                                                                    <span
                                                                                        className={`block truncate align-left ${selected ? 'text-md' : 'text-md'
                                                                                            }`}
                                                                                    >
                                                                                        {data.position == "home" && 'หน้าหลัก'}
                                                                                        {data.position == "login" && 'ร้านค้าผู้หญิง'}
                                                                                        {data.position == "store-women" && 'ร้านค้าผู้หญิง'}
                                                                                        {data.position == "store-men" && 'ร้านค้าผู้ชาย'}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                                                                                            <i className="fa-solid fa-check"></i>                                                                                            </span>
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
                                        </div>
                                    </form>
                                    <div className="mt-4 flex flex-row justify-end items-end ">
                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleClickUpload()}
                                        >
                                            แก้ไข
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
