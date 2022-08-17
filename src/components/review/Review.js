import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import st from '../../styles/allUse/content.module.scss'
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function Review() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))

    const [reviewList, setReviewList] = useState()

    useEffect(() => {
        apiGetReview()
    }, [])

    async function apiGetReview() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/review/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res);
            if (res.data.status) {
                setReviewList(res.data.reviews)
            }
        })
    }

    async function ApiChangeStatus(bankId, status) {
        if (status == 'yes') {
            status = 'no'
        } else if (status == 'no') {
            status = 'yes'
        }
        try {
            await axios({
                method: 'POST',
                url: `${apiUrl}/api/admin/changeStatusReview`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: {
                    id: bankId,
                    display: status
                }
            }).then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'แก้ไขแล้ว'
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }


    function apiDeleteReview(data) {
        console.log(data);
        Swal.fire({
            title: 'ยืนยันการลบรีวิว',
            text: data.message,
            html: `<textarea placeholder="หมายเหตุ" class="border-2" type="text" style="padding: 0.7rem ;border-radius: 10px ; width: 90%" id="message"/>`,
            showCancelButton: true,
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#ff0303",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                if (document.getElementById("message").value.trim() == "") {
                    return false;
                }
                return document.getElementById("message").value.trim()
            }
        }).then((result) => {
            if (result.isConfirmed) {

            } else {
                return false;
            }
        })
    }

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <h1 className={st.title}>Manage Review</h1>

            <div className={st.contentTable}>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                No.
                            </th>
                            <th scope="col" className="py-3 px-6">
                                message
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Date
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
                        {reviewList?.map((data, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="py-2 px-6">
                                    {data.message}
                                </td>
                                <td className="py-2 px-6">
                                    <FormatDate dateTime={data.createdAt} />
                                </td>
                                <td className="py-2 px-6">
                                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={data.display == "yes" ? true : false} onClick={() => ApiChangeStatus(data.id, data.display)} />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                                    </label>
                                </td>
                                <td className="py-2 px-6">
                                    <div className="flex flex-row justify-center ">
                                        <button onClick={() => apiDeleteReview(data)} type="button" className="text-white bg-[#ff0303] hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            <i className="fa-solid fa-trash-can"></i>  ลบ</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
