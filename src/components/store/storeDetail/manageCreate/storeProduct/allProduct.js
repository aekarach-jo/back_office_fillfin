import axios from 'axios'
import React, { useState } from 'react'
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
            Toast.fire({
                icon: 'success',
                title: 'สำเร็จ'
            }).then(() => {
                apiGetStore()
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
                                    <div className="flex  space-x-3 absolute right-20">
                                        <label className="inline-flex relative items-center mx-auto cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                defaultChecked={data.recommend == "yes" ? true : false}
                                                onClick={() => apiSetRecommend(data.product_code, data.recommend)} />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 
                                            peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full 
                                            peer-checked:after:border-gray-300 after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                                             after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                                             dark:border-gray-600 peer-checked:bg-yellow-400" />
                                        </label>
                                    </div>
                                }
                                {/* <i className="fa-regular fa-star  absolute right-20 text-yellow-500 z-10 hover:z-0"></i>
                                <i className="cursor-pointer fa-solid fa-star  absolute right-20 text-white hover:text-yellow-500  z-0 hover:z-10 duration-200"
                                    onClick={() => apiSetRecommend(data.product_code)}></i> */}
                                {data.clip == 'yes' &&
                                    <div className={`${st.column_gift}`}>
                                        <i className="fa-solid fa-gift"></i>
                                        <span>มีคลิป</span>
                                    </div>
                                }
                                <div className={st.product_name}>
                                    <p>{data.name}</p>
                                </div>
                                <div className={st.detail_text}>
                                    <p>รายละเอียด : </p>
                                    <p>{data.content_product}</p>
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