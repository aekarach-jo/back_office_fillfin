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


export default function AllPackage() {
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
        <div className='flex gap-10 flex-wrap justify-center p-6 max-w-[1100px] mx-auto animate-[fade_0.3s_ease-in-out]'>
            {packageList?.map((data, index) => (
                <div key={index} className="max-w-[17rem] p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center">
                        <img className="mb-3 w-32 h-32 rounded-full shadow-lg" src={`${apiUrl}${data.image}`} alt="profile" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{data.content}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
