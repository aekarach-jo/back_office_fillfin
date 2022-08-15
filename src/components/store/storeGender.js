import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function StoreGender({ gender }) {
    console.log(gender);
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [storeList, setStoreList] = useState([])

    useEffect(() => {
        apiGetStore()
    }, [])

    async function apiGetStore() {
        await axios({
            methid: 'GET',
            url: `${apiUrl}/api/admin/store/get?gender=${gender}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res);
            if (res.data.status) {
                setStoreList(res.data.store)
            }
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
    }
    return (
        <div className="h-screen flex-1 p-4   max-h-screen overflow-auto  animate-[fade_.3s_ease-in-out]">
            <div className='flex p-6 max-w-[1000px] mx-auto animate-[slide_.3s_ease-in-out]'>
                <div className='mx-auto flex gap-5 flex-wrap justify-start '>
                    {storeList?.map((data, index) => (
                        <div key={index} >
                            <Link to={`/store/detail/?storeCode=${data.store_code}&gender=${gender}`}>
                                <button type='button' className=" mx-auto  min-w-[9rem] relative bg-white rounded-lg rounded-tl-3xl rounded-br-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:animate-pulse">
                                    {data.status == "active"
                                        ? <span className="flex h-3 w-3 absolute top-1 right-2">
                                            <span className="absolute animate-ping inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75" />
                                            <span className="absolute inline-flex rounded-full h-4 w-4 bg-green-500" />
                                        </span>
                                        : <span className="flex h-3 w-3 absolute top-1 right-2">
                                            <span className="absolute animate-ping  inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75" />
                                            <span className="absolute inline-flex rounded-full h-4 w-4 bg-red-500" />
                                        </span>}


                                    <div className="flex flex-col items-center p-2">
                                        <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={`${apiUrl}${data.profile_img}`} alt="profile" />
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{data.name}</p>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}
