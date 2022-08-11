import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Detail from './detail'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})


export default function PaymentDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [paymentId, setPaymentId] = useState(query.get('payment'))
    const [memberId, setMemberId] = useState(query.get('member'))
    const [paymentDetail, setPaymentDetail] = useState({})

    useEffect(() => {
        apiGetPaymentOrder()
    }, [])

    async function apiGetPaymentOrder() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/packageOrder/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.order);
            if (res.data.status) {
                for (let payDetail of res.data.order) {
                    if (payDetail.paymentId == paymentId && payDetail.username == memberId) {
                        console.log(1);
                        setPaymentDetail(payDetail)
                    }
                }
            }
        })
    }

    function handleConfirmPayment(paymentId) {
        Swal.fire({
            title: 'ยืนยันการชำระเงิน',
            text: 'กรุณาตรวจสอบข้อมูลการชำระเงินให้ถูกต้อง',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#C93A87 ",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                apiConfirmPayment(paymentId)
            } else {
                return false;
            }
        })
    }

    async function apiConfirmPayment(paymentId) {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/package/${paymentId}/confirm`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'สำเร็จ'
            })
            apiGetPaymentOrder()
        })
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }

    return (
        <div className="h-screen flex-1 p-4 pt-12 max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            <div className="relative m-3 text-left gap-2 flex align-middle ">
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to payment</p>
                </button>
            </div>
            <div className="overflow-x-auto relative mt-5 border-2 rounded-lg  max-w-[1100px] mx-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                username
                            </th>
                            <th scope="col" className="py-3 px-6">
                                package
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Gender
                            </th>
                            <th scope="col" className="py-3 px-6">
                                createdAt
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                status
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentDetail &&
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {paymentDetail.username}
                                </th>
                                <td className="py-2 px-6">{paymentDetail.name}</td>
                                <td className="py-2 px-6">{paymentDetail.gender}</td>
                                <td className="py-2 px-6">
                                    <FormatDate dateTime={paymentDetail.createdAt} />
                                </td>
                                <td className="py-2 px-6 text-center">
                                    <p className={`
                                        ${paymentDetail.status_payment == 'confirm' && 'text-green-600'}
                                        ${paymentDetail.status_payment == 'pending' && 'text-yellow-500'}
                                        ${paymentDetail.status_payment == 'error' && 'text-red-500'}
                                         text-md font-semibold`}>{paymentDetail.status_payment}
                                    </p>
                                </td>
                                <td className="py-2 px-6">
                                    {paymentDetail.status_payment != 'confirm'
                                        ? <div className="flex flex-row justify-center ">
                                            <button onClick={() => handleConfirmPayment(paymentDetail.paymentId)} type="button" className="gap-2 flex text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-blue-900">

                                                ยืนยันการชำระเงิน  <i className="fa-solid fa-check-to-slot animate-ping text-green-300"></i></button>
                                        </div>
                                        : <p className='text-green-600 text-center'>ชำระเงินแล้ว</p>
                                    }

                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className="flex flex-col justify-center gap-5 flex-wrap bg-emerald-200/20 ">
                    <Detail paymentDetail={paymentDetail} />
                </div>
            </div>
        </div >
    )
}
