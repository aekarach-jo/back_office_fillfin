import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ManageCreate from './manageCreate/manage_create';
import UploadVideo from './uploadVideo';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})


export default function StoreDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [storeCode, setStoreCode] = useState(query.get('storeCode'))
    const [gender, setGender] = useState(query.get('gender'))
    const [storeDetail, setStoreDetail] = useState('')
    const inputProfileImage = useRef([])
    const [imageObj, setImageobj] = useState()
    const [formEditStore, setFormEditStore] = useState()

    useEffect(() => {
        apiGetStore()
    }, [])

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


    async function apiGetStore() {
        await axios({
            methid: 'GET',
            url: `${apiUrl}/api/admin/store/get?gender=${gender}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.store);
            if (res.data.status) {
                for (let store of res.data.store) {
                    if (storeCode === store.store_code) {
                        setStoreDetail(store)
                        setFormEditStore({
                            storeCode: storeCode,
                            name: store.name,
                            age: store.age,
                            weight: store.weight,
                            height: store.height,
                            bwh: store.bwh
                        })
                    }
                }
            }
        })
    }

    async function apiEditStore() {
        console.log(inputProfileImage.current.files[0]);
        const formData = new FormData()
        formData.append('image', inputProfileImage.current.files[0])
        formData.append('storeCode', formEditStore.storeCode)
        formData.append('name', formEditStore.name)
        formData.append('age', formEditStore.age)
        formData.append('weight', formEditStore.weight)
        formData.append('height', formEditStore.height)
        formData.append('bwh', formEditStore.bwh)
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/store/updateProfile`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: formData
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }

    async function ApiChangeStatus(store_code, status) {
        if (status === 'active') {
            status = 'inactive'
        } else if (status === 'inactive') {
            status = 'active'
        }
        try {
            await axios({
                method: 'POST',
                url: `${apiUrl}/api/admin/store/changeStatusStore`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: {
                    storeCode: store_code,
                    status: status
                }
            }).then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'แก้ไขแล้ว'
                })
                apiGetStore()
            })
        } catch (err) {
            console.log(err);
        }

        async function apiReportStore() {

        }
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }

    return (
        <div className="h-screen flex-1 p-4  max-h-screen overflow-auto  animate-[fade_0.3s_ease-in-out]">
            <div className="relative m-3 text-left gap-2 flex align-middle ">
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to store</p>
                </button>
            </div>
            {/* <h1 className="text-2xl font-semibold ">Product</h1> */}
            <div className="overflow-x-auto relative mt-5 border-2 rounded-lg  max-w-[1100px] mx-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                id
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Store name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                gender
                            </th>
                            <th scope="col" className="py-3 px-6">
                                createdAt
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {storeDetail.id}
                            </th>
                            <td className="py-2 px-6">
                                {storeDetail.name}
                            </td>
                            <td className="py-2 px-6">
                                {storeDetail.gender}
                            </td>
                            <td className="py-2 px-6">
                                <FormatDate dateTime={storeDetail.createdAt} />
                            </td>
                            <td className="py-2 px-6 text-center">
                                {storeDetail &&
                                    <div className="flex  space-x-3">
                                        <label className="inline-flex relative items-center mx-auto cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={storeDetail.status == "active" ? true : false} onClick={() => ApiChangeStatus(storeDetail.store_code, storeDetail.status)} />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                                        </label>
                                    </div>
                                }
                            </td>
                            <td className="py-2 px-6">
                                <div className="flex flex-row justify-center">
                                    <button type="button" className="gap-2 flex text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-red-900">
                                        <i className="my-auto fa-solid fa-circle-minus"></i>
                                        แจ้งปัญหา</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex  bg-pink-200/20">
                    {storeDetail &&
                        <div className='flex flex-row flex-wrap border-r-2 rounded-lg'>
                            <div className=" flex-row p-1">
                                {imageObj
                                    ? <img
                                        src={imageObj}
                                        className='mx-auto mb-3 w-32 h-32 rounded-full shadow-lg'
                                        alt="image-first"

                                        onClick={() => inputProfileImage.current.click()}
                                    />
                                    : <img src={`${apiUrl}${storeDetail.profile_img}`} alt="image"
                                        className='mx-auto mb-3 w-32 h-32 rounded-full shadow-lg'
                                        onClick={() => inputProfileImage.current.click()} />
                                }
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept=".jpg,.jpeg,.png,.webp"
                                    ref={inputProfileImage}
                                    onChange={(e) => inputImageOnChange(e)}
                                />
                                {formEditStore &&
                                    <div className="mt-4">
                                        <div className="w-full max-w-s ">
                                            <div className="flex flex-row mb-2 ">
                                                <div className="w-1/3">
                                                    <label className="block text-left text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        ชื่อร้านค้า
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        className="bg-white  border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                        type="text"
                                                        defaultValue={formEditStore.name}
                                                        onChange={(e) => setFormEditStore({ ...formEditStore, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex  mb-2">
                                                <div className="w-1/3">
                                                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        อายุ
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                        type="text"
                                                        defaultValue={formEditStore.age}
                                                        onChange={(e) => setFormEditStore({ ...formEditStore, age: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mb-2 ">
                                                <div className="w-1/3">
                                                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        สัดส่วน
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                        type="text" defaultValue={formEditStore.bwh}
                                                        onChange={(e) => setFormEditStore({ ...formEditStore, bwh: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mb-2 ">
                                                <div className="w-1/3">
                                                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        น้ำหนัก
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                        type="text" defaultValue={formEditStore.weight}
                                                        onChange={(e) => setFormEditStore({ ...formEditStore, weight: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex  mb-2 ">
                                                <div className="w-1/3">
                                                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        ส่วนสูง
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                                                        type="text" defaultValue={formEditStore.height}
                                                        onChange={(e) => setFormEditStore({ ...formEditStore, height: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <button type="button" className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center m-2 dark:focus:ring-yellow-900"
                                                onClick={() => apiEditStore()}
                                            >แก้ไข</button>
                                            <hr className='' />
                                        </div>
                                    </div>}
                                <div className="flex-col mt-2 items-center">
                                    <UploadVideo videoPath={storeDetail.profile_video} />
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex-col mt-2 items-center w-full">
                        <ManageCreate />
                    </div>
                </div>
            </div>
        </div >
    )
}
