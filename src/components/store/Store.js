import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

function Store() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [storeList, setStoreList] = useState([])
    useEffect(() => {
        apiGetStore()
    }, [])

    async function apiGetStore() {
        await axios({
            methid: 'GET',
            url: `${apiUrl}/api/admin/store/get?gender=men`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.store);
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
        <div className="h-screen flex-1 p-7 pt-12  max-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold">Manage Store</h1>
            <div className='flex gap-10 flex-wrap justify-start p-6 max-w-[1100px] mx-auto'>
                {storeList?.map((data, index) => (
                    <div key={index} className="min-w-[14rem] py-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center">
                            <img className="mb-3 w-32 h-32 rounded-full shadow-lg" src={`${apiUrl}${data.profile_img}`} alt="profile" />
                            <p className="mb-1 text-xl text-lg font-bold text-gray-900 dark:text-white">{data.name}</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{data.content}</span>
                            <div className="flex mt-4 space-x-3">
                                <label className="inline-flex relative items-center mx-auto cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={data.status == "active" ? true : false} onClick={() => ApiChangeStatus(data.store_code, data.status)} />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                                </label>
                            </div>
                            {/* <div className="flex mt-2 space-x-3">
                                <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                >แก้ไข</button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Store