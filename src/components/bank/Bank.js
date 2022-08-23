import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import Modal_add from './modal_add'
import Modal_edit from './modal_edit'
import st from '../../styles/allUse/content.module.scss'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function Bank() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [bankList, setBankList] = useState()
    const [bankData, setBankData] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [choose, setChoose] = useState('')
    useEffect(() => {
        ApiGetBank()
    }, [])

    async function ApiGetBank() {
        try {
            await axios({
                method: 'GET',
                url: `${apiUrl}/api/admin/bank/get`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(res => {
                console.log(res.data.data);
                setBankList(res.data.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function ApiChangeStatus(bankId, status) {
        if (status == 'active') {
            status = 'inactive'
        } else if (status == 'inactive') {
            status = 'active'
        }
        try {
            await axios({
                method: 'POST',
                url: `${apiUrl}/api/admin/changeStatusBank`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: {
                    bank_id: bankId,
                    status: status
                }
            }).then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'แก้ไขแล้ว'
                })
                ApiGetBank()
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function apiDeleteBank(bankId) {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api`
        })
    }

    function onSetOpen() {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>จัดการบัญชีธนาคาร</p>

            <div className={st.contentTable}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                ชื่อบัญชี
                            </th>
                            <th scope="col" className="py-3 px-6">
                                ธนาคาร
                            </th>
                            <th scope="col" className="py-3 px-6">
                                เลขที่บัญชี
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                อักษรย่อ
                            </th>
                            <th scope="col" className="py-3 px-6">
                                สถานะ
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                เพิ่มเติม
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankList?.map((data, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-2 px-6">
                                    {data.name}
                                </td>
                                <td className="py-2 px-6">
                                    {data.bank_name}
                                </td>
                                <td className="py-2 px-6">
                                    {data.bank_number}
                                </td>
                                <td className="py-2 px-6 text-center">
                                    {data.bank_shortname}
                                </td>
                                <td className="py-2 px-6">
                                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={data.status == "active" ? true : false} onClick={() => ApiChangeStatus(data.id, data.status)} />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                                    </label>
                                </td>
                                <td className="py-2 px-6">
                                    <div className="flex flex-row justify-center gap-2">
                                        <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                                            onClick={() => (setIsOpen(!isOpen), setChoose('edit'), setBankData(data))}
                                        >แก้ไข</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={() => (setIsOpen(!isOpen), setChoose('add'))} type="button" className="flex gap-2 align-center
                 item-center justify-center m-3 text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    <i className="fa-solid fa-plus flex align-center justify-center"></i>
                </button>
                {isOpen && choose == 'edit' &&
                    <Modal_edit bankData={bankData} onSetOpen={onSetOpen} setBankData={ApiGetBank} />
                }
                {isOpen && choose == 'add' &&
                    <Modal_add bankData={bankData} onSetOpen={onSetOpen} setBankData={ApiGetBank} />
                }
            </div>
        </div>
    )
}
