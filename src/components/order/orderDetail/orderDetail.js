import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import st from '../../../styles/order/orderDetail.module.scss'
import { Dialog, Listbox, Transition } from '@headlessui/react'

export default function OrderDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [orderNumber, setOrderNumber] = useState(query.get('orderNumber'))
    const [orderDetail, setOrderDetail] = useState()
    const [productList, setProductList] = useState([])
    const [selectStatus, setSelectStatus] = useState()
    const [statusPaymentList, setStatusPaymentList] = useState()
    useEffect(() => {
        apiGetOrder()
        console.log(selectStatus);
        console.log(statusPaymentList);
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
                        setSelectStatus(order.paymentStatus)
                        setStatusPaymentList([
                            { statusPayment: 'pending' },
                            { statusPayment: 'confirm' },
                            { statusPayment: 'failed' },
                        ])
                    }
                }
            }
        })
    }

    function handleReportOrder() {
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
                console.log(result.value);
                apiReportOrder(result.value)
            } else {
                return false;
            }
        })
    }

    async function apiReportOrder(message) {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/orders/updateStatus`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                message: message,
                orderNumber: orderDetail.orderNumber,
                status: 'failed'
            }
        }).then(res => {
            if (res.data.status) {
                apiGetOrder()
            }
        })
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <div className={st.wrapBtnBack}>
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to order</p>
                </button>
            </div>
            <div className={st.contentTable}>
                <table >
                    <thead >
                        <tr>
                            <th scope="col"> เลขที่ออเดอร์</th>
                            <th scope="col"> ชื่อผู้สั่ง  </th>
                            <th scope="col"> วันที่ซื้อ  </th>
                            <th scope="col"> สถานะการชำระเงิน </th>
                            <th scope="col"> สถานะสินค้า </th>
                            <th scope="col"> เพิ่มเติม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetail &&
                            <tr>
                                <td>{orderDetail.orderNumber}</td>
                                <td> {orderDetail.name}</td>
                                <td > <FormatDate dateTime={orderDetail.createdAt} /></td>
                                <td>
                                    <Listbox value={selectStatus} onChange={setSelectStatus}>
                                        {selectStatus &&
                                            <div className="relative z-10">
                                                <Listbox.Button className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500">
                                                    <span className="block truncate text-left">{selectStatus}</span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <i className="animate-bounce fa-solid fa-arrow-down"></i>
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {statusPaymentList?.map((data, index) => (
                                                            <Listbox.Option
                                                                key={index}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                defaultValue={data}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block truncate align-left ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}
                                                                        >
                                                                            {data.statusPayment}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                                                                                <i className="text-pink-500 fa-solid fa-check"></i>
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        }
                                    </Listbox>
                                </td>
                                {/* <td>
                                    <p className={`
                                        ${orderDetail.paymentStatus == 'pending' && 'text-yellow-500'}
                                        ${orderDetail.paymentStatus == 'confirm' && 'text-green-600'}
                                        ${orderDetail.paymentStatus == 'failed' && 'text-red-500'}
                                         text-md font-semibold`}>{orderDetail.paymentStatus}
                                    </p>
                                </td> */}
                                <td>
                                    <p className={`
                                                ${orderDetail.status === "pending" && "text-yellow-500"}
                                                ${orderDetail.status === "shipping" && "text-orange-500"}
                                                ${orderDetail.status === "success" && "text-green-600"}
                                                ${orderDetail.status === "failed" && "text-red-500"}
                                                text-md font-semibold`}
                                    >
                                        {orderDetail.status}
                                    </p>
                                </td>
                                <td>
                                    <div className={st.report}>
                                        <button onClick={() => handleReportOrder(orderDetail)} type="button">
                                            <i className="my-auto fa-solid fa-circle-minus"></i>
                                            แจ้งปัญหา</button>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className={st.contentProduct}>
                    {productList.length > 0 &&
                        <>
                            {productList?.map((data, index) => (
                                <div key={index}>
                                    <div className={st.product}>
                                        <img className="" src={`${apiUrl}${data.product_image}`} alt="productImage" />
                                        <div className={st.productDetail}>
                                            <p className={st.pd_name}>{data.product_name}</p>
                                            <p className={st.pd_content}>{data.product_content} </p>
                                            <p className={` ${st.pd_status}
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
