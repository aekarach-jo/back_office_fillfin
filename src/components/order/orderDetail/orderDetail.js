import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function OrderDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [orderNumber, setOrderNumber] = useState(query.get('orderNumber'))
    const [orderDetail, setOrderDetail] = useState()
    const [productList, setProductList] = useState([])

    console.log(productList);
    useEffect(() => {
        apiGetOrder()
    }, [])

    async function apiGetOrder() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/orders/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            if (res.data.status) {
                for (let order of res.data.order) {
                    if (orderNumber == order.orderNumber) {
                        setOrderDetail(order)
                        setProductList(order.product)
                    }
                }
            }
        })
    }

    function apiReportOrder() {
        Swal.fire({
            title: 'แจ้งบัญหา',
            html: `<textarea placeholder="หมายเหตุ" class="border-2" type="text" style="padding: 0.7rem ;border-radius: 10px ; width: 90%" id="message"/>`,
            showCancelButton: true,
            confirmButtonText: 'แจ้งปัญหา',
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

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }

    return (
        <div className="h-screen flex-1 p-7 pt-12 max-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold ">Product</h1>
            <div className="relative m-3 text-left gap-2 flex align-middle ">
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to order</p>
                </button>
            </div>
            <div className="overflow-x-auto relative mt-5 border-2 rounded-lg  max-w-[1100px] mx-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Order Number
                            </th>
                            <th scope="col" className="py-3 px-6">
                                name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                createdAt
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                payment Status
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetail &&
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {orderDetail.orderNumber}
                                </th>
                                <td className="py-2 px-6">
                                    {orderDetail.name}
                                </td>
                                <td className="py-2 px-6">
                                    <FormatDate dateTime={orderDetail.createdAt} />
                                </td>
                                <td className="py-2 px-6 text-center">
                                    <p className={`
                                        ${orderDetail.paymentStatus == 'confirm' && 'text-green-600'}
                                        ${orderDetail.paymentStatus == 'pending' && 'text-yellow-500'}
                                        ${orderDetail.paymentStatus == 'error' && 'text-red-500'}
                                         text-md font-semibold`}>{orderDetail.paymentStatus}
                                    </p>
                                </td>
                                <td className="py-2 px-6">
                                    <div className="flex flex-row justify-center">
                                        <button onClick={() => apiReportOrder()} type="button" className="gap-2 flex text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-red-900">
                                            <i className="my-auto fa-solid fa-circle-minus"></i>
                                            แจ้งปัญหา</button>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className="flex justify-center gap-5 py-10 flex-wrap bg-emerald-200/20 ">
                    {productList.length > 0 &&
                        <>
                            {productList?.map((data, index) => (
                                <div key={index}>
                                    <div className="rounded-lg shadow-lg bg-white max-w-xs relative">
                                        <img className="mx-auto rounded-t-lg" src={`${apiUrl}${data.product_image}`} alt="productImage" />
                                        <div className="p-6">
                                            <h5 className="text-gray-900 text-xl font-medium mb-2">{data.product_name}</h5>
                                            <p className="text-gray-700 text-base mb-4">{data.product_content} </p>
                                            <p
                                                className={` 
                                            inline-block px-6 py-1.5  text-white font-medium text-xs 
                                            leading-tight uppercase  shadow-md 
                                            ${data.product_status == 'pending' && 'bg-yellow-600  hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'accepted' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'success' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'shipping' && 'bg-orange-600   hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}                                             `}
                                            >{data.product_status}</p>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </>
                    }
                </div>
            </div>
        </div >
    )
}
