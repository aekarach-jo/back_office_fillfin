import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal_edit from './modal_edit'

export default function Bank() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [bankList, setBankList] = useState()
    const [bankData, setBankData] = useState()

    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        apiGetBank()
    }, [])

    async function apiGetBank() {
        try {
            await axios({
                method: 'GET',
                url: `${apiUrl}/api/admin/bank/get`
            }).then(res => {
                console.log(res.data.data);
                setBankList(res.data.data)
            })
        } catch (err) {
            console.log(err);
        }
    }
    function onSetOpen() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="h-screen flex-1 p-7 pt-12">
            <h1 className="text-2xl font-semibold ">Manage Bank</h1>

            <div className="overflow-x-auto relative mt-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Bank name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Bank number
                            </th>
                            <th scope="col" className="py-3 px-6">
                                shortname
                            </th>
                            <th scope="col" className="py-3 px-6">
                                status
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankList?.map((data, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.id}
                                </th>
                                <td className="py-4 px-6">
                                    {data.bank_name}
                                </td>
                                <td className="py-4 px-6">
                                    {data.bank_number}
                                </td>
                                <td className="py-4 px-6">
                                    {data.bank_shortname}
                                </td>
                                <td className="py-4 px-6">
                                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                                    </label>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-row justify-center">
                                        <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                                            onClick={() => (setIsOpen(!isOpen), setBankData(data))}
                                        >แก้ไข</button>
                                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ลบ</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isOpen &&
                    <Modal_edit bankData={bankData} onSetOpen={onSetOpen} />
                }
            </div>
        </div>
    )
}
