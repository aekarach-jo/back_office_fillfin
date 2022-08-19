import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import ScrollToTop from '../../../../sub_component/scrollToTop/scrollToTop'
import st from '../scss/allProduct.module.scss'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})


export default function AllProduct({ productList, apiGetStore }) {
    console.log(productList);
    const access_token = useSelector((state) => (state.app.access_token))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [isDelete, setIsDelete] = useState(false)
    const [select, setSelect] = useState()
    const [priorityNumber, setPriorityNumber] = useState()
    const [onChoose, setOnChoose] = useState()
    useEffect(() => {
    }, [])

    function handleConfirmDelete(product_code) {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            title: 'ยืนยันการลบสินค้า',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                apiDeleteProduct(product_code)
            }
        })
    }

    async function apiDeleteProduct(product_code) {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/storeProduct/delete/${product_code}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(() => {
            setIsDelete(true)
            setTimeout(() => { setIsDelete(false) }, 1000)
            Toast.fire({
                icon: 'success',
                title: 'ลบแล้ว'
            }).then(() => {
                apiGetStore()
            })
        })
    }
    async function setPriority(productCode) {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/storeProduct/setPriority`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                productCode: productCode.toString(),
                priority: parseInt(priorityNumber)
            }
        }).then(() => {
            Toast.fire({
                icon: 'success',
                title: 'สำเร็จ'
            }).then(() => {
                apiGetStore()
            })
        })
    }

    async function apiSetRecommend(product_code, recommend) {
        if (recommend == 'yes') {
            recommend = 'no'
        } else if (recommend == 'no') {
            recommend = 'yes'
        }
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/storeProduct/setRecommend`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                productCode: product_code,
                recommend: recommend
            }
        }).then(() => {
            apiGetStore()
            Toast.fire({
                icon: 'success',
                title: 'สำเร็จ'
            })
        })
    }

    return (
        <div className={`${st.column_box_product} animate-[fade_0.3s_ease-in-out]`}>
            <div className={`${st.text_box_top} flex justify-between`}>
                <p>สินค้าทั้งหมด</p>
                <p>สินค้าทั้งหมดทั้งหมด {productList.length} รายการ</p>
            </div>
            {productList.length > 0
                ? <>
                    <div className={`${st.column_product_recommend} ${st.displayScroller}  h-[580px] overflow-auto relative`}>
                        {productList?.map((data, index) => (
                            <div
                                key={index}
                                className={`
                                ${st.recommend_column} 
                                ${isDelete && index == select && 'animate-[fadeOut_1s_ease-in-out]'}`}>
                                <i className={`fa-solid fa-trash-can ${st.icon_trash}`}
                                    onClick={() => (handleConfirmDelete(data.product_code), setSelect(index))}
                                ></i>
                                <i className="fa-solid fa-trash-can absolute right-8 text-red-500 z-0"></i>
                                {productList &&
                                    <div className="flex space-x-3 absolute right-16 ">
                                        <div className="inline-flex  items-center mx-auto cursor-pointer">
                                            <i className={`
                                            ${data.recommend == 'yes' && 'text-yellow-500'} 
                                            ${data.recommend == 'no' && 'fa-regular'} 
                                            text-lg cursor-pointer fa-solid fa-star  hover:text-yellow-500 duration-200`}
                                                onClick={() => apiSetRecommend(data.product_code, data.recommend)}></i>
                                        </div>
                                    </div>
                                }
                                {data.clip == 'yes' &&
                                    <div className={`${st.column_gift}`}>
                                        <i className="fa-solid fa-gift"></i>
                                        <span>มีคลิป</span>
                                    </div>
                                }
                                <div className={st.product_name}>
                                    <p>{data.name}</p>
                                </div>
                                <div className="flex space-x-3 absolute right-7">
                                    <div className='flex flex-col justify-between py-2 h-20 w-5 scale-90'>
                                        {priorityNumber <= data.priority && onChoose == index &&
                                            <i className="text-lg font-bold opacity-70 text-gray-700 hover:opacity-100 hover:shadow-md fa-solid fa-arrow-up duration-200 cursor-pointer"
                                                onClick={() => setPriority(data.product_code)}
                                            ></i>
                                        }
                                        <input
                                            className='w-5 p-1'
                                            type="text"
                                            // defaultValue=''
                                            placeholder={data.priority}
                                            onChange={(e) => (setPriorityNumber(e.target.value.trim("")), setOnChoose(index))} />
                                        {priorityNumber >= data.priority && onChoose == index &&
                                            <i className="text-lg font-bold opacity-70 text-gray-700 hover:opacity-100 hover:shadow-md fa-solid fa-arrow-down duration-200 cursor-pointer"
                                                onClick={() => setPriority(data.product_code)}
                                            ></i>
                                        }
                                    </div>
                                </div>
                                <div className={st.detail_text}>
                                    <p>รายละเอียด : </p>
                                    <p>{data.content_product}</p>
                                </div>
                                <div className={st.price_text}>
                                    <p>ราคา : </p>
                                    <p>{data.price}</p>
                                </div>
                                <div className={st.column_img}>
                                    <ShowImagePost image={data.product_img} />
                                </div>
                            </div>
                        ))}
                        <ScrollToTop />
                    </div>
                </>
                : <div className='my-2'>ไม่มีสินค้าในขณะนี้</div>
            }
        </div>
    )
}


function ShowImagePost({ image }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    if (!image) {
        return false; // ถ้าไม่มีรูป ไม่ต้องแสดงรูป
    }
    let image_split = image.split(",");
    const response = image_split.map((data, index) => {
        return (
            <img
                src={`${apiUrl}${data}`}
                alt="image-product"
                key={index}
                onError={e => {
                    console.log(1);
                    e.target.setAttribute('src', '/assets/empty.png');
                    return false;
                }} />
        )
    })
    return response;
}