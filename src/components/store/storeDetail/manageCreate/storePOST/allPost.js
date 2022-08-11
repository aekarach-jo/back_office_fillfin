import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import ScrollToTop from '../../../../sub_component/scrollToTop/scrollToTop'
import st from '../scss/allPost.module.scss'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function AllPost({ postList, apiGetStore }) {
    const access_token = useSelector((state) => (state.app.access_token))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [isDelete, setIsDelete] = useState(false)
    const [select, setSelect] = useState()

    function handleConfirmDelete(post_code) {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            title: 'ยืนยันการลบโพสต์',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                apiDeletePost(post_code)
            }
        })
    }

    async function apiDeletePost(post_code) {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/storePost/delete/${post_code}`,
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

    return (
        <div className={`${st.column_box_product} animate-[fade_0.3s_ease-in-out]`}>
            <div className={`${st.text_box_top} flex justify-between`}>
                <p>โปรไฟล์โพสต์</p>
                <p>โพสต์ทั้งหมด {postList.length} รายการ</p>
            </div>
            {postList.length > 0
                ? <>
                    <div className={`${st.column_product_recommend} ${st.displayScroller}  h-[580px] overflow-auto relative`}>
                        {postList?.map((data, index) => (
                            <div
                                key={index}
                                className={`
                                ${st.recommend_column} 
                                ${isDelete && index == select && 'animate-[fadeOut_1s_ease-in-out]'}`}>
                                <i className={`fa-solid fa-trash-can ${st.icon_trash}`}
                                    onClick={() => (handleConfirmDelete(data.post_code), setSelect(index))}
                                ></i>
                                <i className="fa-solid fa-trash-can absolute right-8 text-red-500 z-0"></i>
                                <div className={`${st.column_calendar}`}>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <FormetDate dateTime={data.createdAt} />
                                </div>
                                <div className={st.detail_text}>
                                    <p>{data.caption}</p>
                                </div>
                                <div className={st.column_img}>
                                    <ShowImagePost image={data.post_img} />
                                </div>
                            </div>
                        ))}
                        <ScrollToTop />
                    </div>
                </>
                : <div className='my-2'>ไม่มีโพสต์</div>
            }
        </div>
    )
}


function FormetDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <h4>{dateTime}</h4>
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