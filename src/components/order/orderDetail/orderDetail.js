import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Dialog, Listbox, Transition } from '@headlessui/react'
import CustomizedSteppers from '../../sub_component/stepper';
import st from '../../../styles/order/orderDetail.module.scss'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

const formStatusPayment = [
    { id: 0, paymentStatus: 'pending' },
    { id: 1, paymentStatus: 'confirm' },
    { id: 2, paymentStatus: 'failed' },
]

const formStatusOrder = [
    { id: 0, status: 'pending' },
    { id: 1, status: 'success' },
    { id: 2, status: 'failed' },
]
export default function OrderDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [orderNumber, setOrderNumber] = useState(query.get('orderNumber'))
    const [orderDetail, setOrderDetail] = useState()
    const [productList, setProductList] = useState([])
    const [productRec, setProductRec] = useState([])
    const [productPre, setProductPre] = useState([])
    const [selectStatus, setSelectStatus] = useState()
    const [selectStatusOrder, setSelectStatusOrder] = useState()
    const [statusPaymentList, setStatusPaymentList] = useState(formStatusPayment)
    const [statusOrderList, setStatusOrderList] = useState(formStatusOrder)
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
                        const filterRec = order.product.filter(p => p.recommend == 'yes' && p.preOrder != 'yes')
                        const filterPre = order.product.filter(p => p.preOrder == 'yes' && p.recommend != 'yes')
                        const filterProduct = order.product.filter(p => p.preOrder == 'no' && p.recommend == 'no')
                        setOrderDetail(order)
                        setProductRec(filterRec)
                        setProductPre(filterPre)
                        setProductList(filterProduct)
                        setSelectStatus({ paymentStatus: order.paymentStatus })
                        setSelectStatusOrder({ status: order.status })
                        if (!order.isRead) {
                            apiSetReadOrder()
                        }
                    }
                }
            }
        })
    }

    async function apiSetReadOrder() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/orders/read/${orderNumber}`,
            headers: {
                Authorization: `Bearer ${access_token}`
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
                Toast.fire({
                    icon: 'success',
                    title: 'สำเร็จ'
                })
                apiGetOrder()
            }
        })
    }

    async function handleChangeOrderStatus(orderStatus) {
        console.log(orderStatus);
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/orders/updateStatus`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                orderNumber: orderNumber,
                status: orderStatus,
                message: ''
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }

    async function handleChangepaymentStatus(paymentStatus) {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/orders/updatePaymentStatus`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                orderNumber: orderNumber,
                status: paymentStatus
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }

    function FormatDate({ dateTime }) {
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <span>{dateTime}</span>
    }

    function handleChangeStatus(statusToChange, productId) {
        Swal.fire({
            title: 'ยืนยันการเปลี่ยนสถานะ',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#C93A87",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                apiUpdateStatusProduct(statusToChange, productId)
            }
        })
    }

    async function apiUpdateStatusProduct(statusToChange, productId) {
        console.log(statusToChange);
        console.log(productId);
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/orders/updateProductStatus`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                orderNumber: orderNumber,
                productId: productId,
                status: statusToChange
            }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'สำเร็จ'
            }).then(() => {
                apiGetOrder()
            })
        })
    }

    function handleShowSlip(slip) {
        Swal.fire({
            imageUrl: apiUrl + slip,
            imageWidth: 400,
            imageHeight: 500,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            backdrop: true,
            background: 'rgba(0,0,0,0)'
        })
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
                            <th scope="col"> ราคารวม  </th>
                            <th scope="col"> สลิป </th>
                            <th scope="col"> สถานะการชำระเงิน </th>
                            <th scope="col"> สถานะออเดอร์ </th>
                            <th scope="col"> เพิ่มเติม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetail &&
                            <tr>
                                <td>{orderDetail.orderNumber}</td>
                                <td>{orderDetail.name}</td>
                                <td> <FormatDate dateTime={orderDetail.createdAt} /></td>
                                <td>{orderDetail.totalPrice}</td>
                                <td> <img className='cursor-pointer text-center' onClick={() => handleShowSlip(orderDetail.slip)} width={35} height={35} src={`${apiUrl}${orderDetail.slip}`} alt="slip" /></td>
                                <td>
                                    <Listbox value={selectStatus} onChange={setSelectStatus}>
                                        {selectStatus &&
                                            <div className="relative z-10">
                                                <Listbox.Button className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight 
                                                 ${selectStatus.paymentStatus == 'pending' && 'bg-yellow-500'}
                                                 ${selectStatus.paymentStatus == 'confirm' && 'bg-green-500/50'}
                                                 ${selectStatus.paymentStatus == 'failed' && 'bg-red-500 text-rose-100'}
                                                `}>
                                                    <span className="block truncate text-left text-white ">
                                                        {selectStatus.paymentStatus === "pending" && 'รอการยืนยัน'}
                                                        {selectStatus.paymentStatus === "confirm" && 'ยืนยันแล้ว'}
                                                        {selectStatus.paymentStatus === "failed" && 'ผิดพลาด'}                                                        </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <i className="text-white animate-bounce fa-solid fa-arrow-down"></i>
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {statusPaymentList?.map((data) => (
                                                            <Listbox.Option
                                                                key={data.id}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none p-2 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={data}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block text-xs truncate align-left ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}
                                                                            onClick={() => handleChangepaymentStatus(data.paymentStatus)}
                                                                        >
                                                                            {data.paymentStatus === "pending" && 'รอการยืนยัน'}
                                                                            {data.paymentStatus === "confirm" && 'ยืนยันแล้ว'}
                                                                            {data.paymentStatus === "failed" && 'ผิดพลาด'}                                                                        </span>
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
                                <td>
                                    <Listbox value={selectStatusOrder} onChange={setSelectStatusOrder}>
                                        {selectStatusOrder &&
                                            <div className="relative z-10">
                                                <Listbox.Button className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight 
                                                 ${selectStatusOrder.status === 'pending' && 'bg-yellow-500'}
                                                 ${selectStatusOrder.status === 'shipping' && 'bg-orange-500'}
                                                 ${selectStatusOrder.status === 'success' && 'bg-green-500/50'}
                                                 ${selectStatusOrder.status === 'failed' && 'bg-red-500 text-rose-100'}
                                                `}>
                                                    <span className="block truncate text-left text-white ">
                                                        {selectStatusOrder.status === "pending" && 'กำลังดำเนินการ'}
                                                        {selectStatusOrder.status === "shipping" && 'กำลังส่ง'}
                                                        {selectStatusOrder.status === "success" && 'ส่งแล้ว'}
                                                        {selectStatusOrder.status === "failed" && 'ผิดลาด'}
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <i className="text-white animate-bounce fa-solid fa-arrow-down"></i>
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {statusOrderList?.map((data) => (
                                                            <Listbox.Option
                                                                key={data.id}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none p-2 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={data}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span
                                                                            className={`text-xs block truncate align-left ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}
                                                                            onClick={() => handleChangeOrderStatus(data.status)}
                                                                        >
                                                                            {data.status === "pending" && 'กำลังดำเนินการ'}
                                                                            {data.status === "shipping" && 'กำลังส่ง'}
                                                                            {data.status === "success" && 'ส่งแล้ว'}
                                                                            {data.status === "failed" && 'ผิดพลาด'}
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
                <div className={st.contentBottom}>
                    {productList.length > 0 &&
                        <div className={st.contentProduct}>
                            <p className={st.title}>สินค้าทั่วไป</p>
                            <>
                                {productList?.map((data, index) => (
                                    <div key={index}>
                                        <div className={st.product}>
                                            <img src={`${apiUrl}${data.product_image}`} alt="productImage"
                                                onError={e => {
                                                    e.target.setAttribute('src', '/assets/empty.png');
                                                    return false;
                                                }} />
                                            <div className={st.productDetail}>
                                                <p className={`font-bold ${st.pd_name}`}>{data.product_name}</p>
                                                <p className={st.pd_content}>{data.product_content} </p>
                                                <p className={` ${st.pd_status}
                                            ${data.product_status == 'pending' && 'bg-yellow-600  hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'accepted' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'success' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'shipping' && 'bg-orange-600   hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}                                             `}
                                                >{data.product_status}</p>
                                                <div className='absolute bg-white w-20 h-8 top-3 right-2 flex flex-row items-center justify-center gap-2 rounded-bl-lg'>
                                                    <p className={`text-xl font-bold`}>{data.price}</p>
                                                    <i className="text-red-500 fa-solid fa-tags"></i>
                                                </div>
                                            </div>
                                            <div className='w-full rounded-b-lg bg-gray-300'>
                                                <CustomizedSteppers product={data} handleChangeStatus={handleChangeStatus} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        </div>
                    }
                    {productPre.length > 0 &&
                        <div className={st.contentProduct}>
                            <p className={st.title}>สินค้าพรีออเดอร์</p>
                            <>
                                {productPre?.map((data, index) => (
                                    <div key={index}>
                                        <div className={st.product}>
                                            <img src={`${apiUrl}${data.product_image}`} alt="productImage"
                                                onError={e => {
                                                    e.target.setAttribute('src', '/assets/empty.png');
                                                    return false;
                                                }} />
                                            <div className={st.productDetail}>
                                                <p className={`font-bold ${st.pd_name}`}>{data.product_name}</p>
                                                <p className={st.pd_content}>{data.product_content} </p>
                                                <p className={` ${st.pd_status}
                                            ${data.product_status == 'pending' && 'bg-yellow-600  hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'accepted' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'success' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'shipping' && 'bg-orange-600   hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}                                             `}
                                                >{data.product_status}</p>
                                                <div className='absolute bg-white w-20 h-8 top-3 right-2 flex flex-row items-center justify-center gap-2 rounded-bl-lg'>
                                                    <p className={`text-xl font-bold`}>{data.price}</p>
                                                    <i className="text-red-500  fa-solid fa-tags"></i>
                                                </div>
                                            </div>
                                            <div className='w-full rounded-b-lg bg-gray-300'>
                                                <CustomizedSteppers product={data} handleChangeStatus={handleChangeStatus} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        </div>
                    }
                    {productRec.length > 0 &&
                        <div className={st.contentProduct}>
                            <p className={st.title}>สินค้าแนะนำ</p>
                            <>
                                {productRec?.map((data, index) => (
                                    <div key={index}>
                                        <div className={st.product}>
                                            <img src={`${apiUrl}${data.product_image}`} alt="productImage"
                                                onError={e => {
                                                    e.target.setAttribute('src', '/assets/empty.png');
                                                    return false;
                                                }}
                                            />
                                            <div className={st.productDetail}>
                                                <p className={`font-bold ${st.pd_name}`}>{data.product_name}</p>
                                                <p className={st.pd_content}>{data.product_content} </p>
                                                <p className={` ${st.pd_status}
                                            ${data.product_status == 'pending' && 'bg-yellow-600  hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'accepted' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'success' && 'bg-green-600   hover:shadow-lg  absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}
                                            ${data.product_status == 'shipping' && 'bg-orange-600   hover:shadow-lg absolute rotate-[-45deg] text-lg left-[-24px] top-3 text-white  px-5 transition duration-150  ease-in-out'}                                             `}
                                                >{data.product_status}</p>
                                                <div className='absolute bg-white w-20 h-8 top-3 right-2 flex flex-row items-center justify-center gap-2 rounded-bl-lg'>
                                                    <p className={`text-xl font-bold`}>{data.price}</p>
                                                    <i className="text-red-500 fa-solid fa-tags"></i>
                                                </div>
                                            </div>
                                            <div className='w-full rounded-b-lg bg-gray-300'>
                                                <CustomizedSteppers product={data} handleChangeStatus={handleChangeStatus} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}
