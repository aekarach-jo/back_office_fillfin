import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})


export default function Package() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [packageList, setPackageList] = useState()
    const [changeEdit, setChangeEdit] = useState()

    useEffect(() => {
        apiGetPackage()
    }, [])

    async function apiGetPackage() {
        await axios({
            methid: 'GET',
            url: `${apiUrl}/api/admin/package/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            setPackageList(res.data.data)
        })
    }
    return (
        <div className="h-screen flex-1 p-7 pt-12  max-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold">Manage Package</h1>
            <div className='flex gap-10 flex-wrap justify-center p-6   max-w-[1100px] mx-auto'>
                {packageList?.map((data, index) => (
                    <div key={index} className="max-w-[17rem] p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center">
                            <img className="mb-3 w-32 h-32 rounded-full shadow-lg" src={`${apiUrl}${data.image}`} alt="profile" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{data.content}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button onClick={() => setChangeEdit(!changeEdit)} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                >แก้ไข</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
