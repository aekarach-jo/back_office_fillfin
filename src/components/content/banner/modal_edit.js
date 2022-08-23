import { Dialog, Listbox, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
})

export default function Modal_edit({ data, onSetOpen, apiGetContent }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))

    const inputImage = useRef([])
    const [imageObj, setImageobj] = useState([])

    console.log(inputImage.current);
    useEffect(() => {
        splitImage()
    }, [])

    function splitImage() {
        const sp = data.image.split(',')
        const arr = sp.map(data => {
            return apiUrl + data
        })
        setImageobj(arr)
    }

    function apiUpdateSingleImage(){

    }

    function inputImageOnChange(e ,index) {
        setImageobj([])
        const arrImageUpload = []
        console.log("imageObj", imageObj);
        for (let i = 0; i < e.target.files.length; i++) {
            if (
                ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[i].type)
            ) {
                arrImageUpload.push(e.target.files[i])
                inputImage.current = arrImageUpload
                setImageobj(prev => [...prev, URL.createObjectURL(e.target.files[i])])
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
    }

    function handleClickUpload(position) {
        const formData = new FormData()
        for (let item of inputImage.current) {
            formData.append("image", item)
        }
        formData.append("position", position)

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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h2"
                                        className="pb-4 text-lg leading-6 text-gray-900"
                                    >
                                        แก้ไขโฆษณา
                                    </Dialog.Title>
                                    <form className="w-full ">
                                        <div className="md:flex md:items-center mb-3">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                    ตำแหน่ง
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" >
                                                    {data.position == 'home' && 'หน้าหลัก'}
                                                    {data.position == 'login' && 'หน้าล็อกอิน'}
                                                    {data.position == 'store' && 'หน้าร้านค้า'}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    เพิ่มรูป
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <label className="cursor-pointer block text-gray-500  font-bold md:text-left mb-1 md:mb-0 pr-4">
                                                    <div className='hover:text-pink-500'>เลือกรูปภาพ</div>

                                                    <input
                                                        style={{ display: 'none' }}
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png,.webp"
                                                        ref={inputImage}
                                                        multiple
                                                        onChange={(e) => inputImageOnChange(e)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-full h-full">
                                            {imageObj.length > 0 &&
                                                <div className='flex flex-row flex-wrap h-96 justify-center gap-3 overflow-y-scroll'>
                                                    {imageObj?.map((image, index) => (
                                                        <div key={index}>
                                                            {index}
                                                            < img
                                                                alt="image-first"
                                                                src={image}
                                                                className="h-52 w-96"
                                                                onClick={() => inputImage.current.click()}
                                                            />
                                                            <input
                                                                style={{ display: 'none' }}
                                                                type="file"
                                                                accept=".jpg,.jpeg,.png,.webp"
                                                                ref={inputImage}
                                                                multiple
                                                                onChange={(e) => apiUpdateSingleImage(e,index)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    </form>
                                    <div className="mt-4 flex flex-row justify-end items-end ">
                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleClickUpload(data.position)}
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
