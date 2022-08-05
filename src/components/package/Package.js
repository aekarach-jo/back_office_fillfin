import { Listbox } from '@headlessui/react'
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
            console.log(res.data.data);
            setPackageList(res.data.data)
        })
    }
    return (
        <div className="h-screen flex-1 p-7 pt-12  max-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold mb-6">Manage Package</h1>
            <div className='flex gap-10 flex-wrap justify-center'>
                {packageList?.map((data, index) => (
                    <div key={index} className="max-w-[17rem] pt-6 p-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        {/* <div className="flex justify-end px-4 pt-4">
                            <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>
                            </button>
                            <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <ul className="py-1" aria-labelledby="dropdownButton">
                                    <li>
                                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        <div className="flex flex-col items-center">
                            <img className="mb-3 w-32 h-32 rounded-full shadow-lg" src={`${apiUrl}${data.image}`} alt="profile" />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{data.content}</span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button onClick={() => setChangeEdit(!changeEdit)} className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                                >แก้ไข</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
