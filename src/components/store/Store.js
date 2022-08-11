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

function Store() {
    const [gender, setGender] = useState(localStorage.getItem('store_gender'))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [storeList, setStoreList] = useState([])

    useEffect(() => {
        apiGetStore()
    }, [gender])

    async function apiGetStore() {
        await axios({
            methid: 'GET',
            url: `${apiUrl}/api/admin/store/get?gender=${gender}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data);
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
            <h1 className="text-2xl font-semibold">Manage Store</h1>
            <div className="inline-flex rounded-md shadow-sm m-5" role="group">
                <button
                    onClick={() => (setGender('men'), localStorage.setItem('store_gender', 'men'))}
                    type="button"
                    className={`duration-200 inline-flex items-center py-2 px-4 text-sm font-medium 
                     bg-transparent rounded-l-lg border border-pink-500 hover:bg-pink-500
                     hover:text-white focus:z-10 focus:ring-2 focus:ring-pink-500 focus:bg-pink-500 
                     focus:text-white dark:border-white dark:text-white dark:hover:text-white
                     ${gender == 'men' && 'bg-pink-900 text-white '} `}
                >
                    <i className="mr-2 fa-solid fa-neuter"></i>
                    Men
                </button>

                <button
                    onClick={() => (setGender('women'), localStorage.setItem('store_gender', 'women'))}
                    type="button"
                    className={`duration-200 inline-flex items-center py-2 px-4 text-sm font-medium 
                     bg-transparent rounded-r-lg border border-pink-500 hover:bg-pink-500
                     hover:text-white focus:z-10 focus:ring-2 focus:ring-pink-500 focus:bg-pink-500 
                     focus:text-white dark:border-white dark:text-white dark:hover:text-white
                        ${gender == 'women' && 'bg-pink-900 text-white '} `}>
                    Women
                    <i className="ml-2 fa-solid fa-mars"></i>
                </button>
            </div>

            <div className='flex p-6 max-w-[1000px] mx-auto animate-[slide_.3s_ease-in-out]'>
                <div className='flex gap-10 flex-wrap justify-start '>
                    {storeList?.map((data, index) => (
                        <div key={index} >
                            <Link to={`/store/detail/?storeCode=${data.store_code}`}>
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

export default Store