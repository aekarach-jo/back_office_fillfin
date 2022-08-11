import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import FormData from 'form-data'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import st from '../scss/allProduct.module.scss'
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function CreatePreorder({ apiGetStore }) {
    const query = new URLSearchParams(useLocation().search);
    const [storeCode, setStoreCode] = useState(query.get('storeCode'))
    const access_token = useSelector((state) => (state.app.access_token))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const inputFirstImage = useRef([])
    const inputSecondImage = useRef([])
    const [imageObj, setImageobj] = useState({})

    let form = { name_premium: "", content_premium: "", clip: "no", price_premium: "" }
    const [formProduct, setFormProduct] = useState(form)

    function inputImageOnChange(e, name) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)
        ) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setImageobj(prev => ({
                ...prev,
                [name]: URLs
            }));
        } else {
            Swal.fire({
                title: "กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ",
                icon: "warning",
                position: "center",
                timer: 1000,
                showConfirmButton: false
            });
        }
    }

    function FormetDate({ dateTime }) {
        dateTime = moment().format("DD MMM YYYY");
        return <h4>{dateTime}</h4>
    }

    function handleClickCreateProduct() {
        const formData = new FormData()
        formData.append("premium", inputFirstImage.current.files[0])
        formData.append("premium", inputSecondImage.current.files[0])

        formData.append("storeCode", storeCode)
        formData.append("name_premium", formProduct.name_premium)
        formData.append("content_premium", formProduct.content_premium)
        formData.append("price_premium", formProduct.price_premium)
        formData.append("clip", formProduct.clip)

        Swal.fire({
            title: "ยืนยันการโพสต์",
            icon: "question",
            position: "center",
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#C93A87',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                createPreorder(formData)
            } else {
                setImageobj("")
                inputFirstImage.current = []
                inputSecondImage.current = []
            }
        })
    }


    async function createPreorder(params) {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/storeProductPre/Create`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data"
            },
            data: params
        })
        Toast.fire({
            icon: 'success',
            title: 'สำเร็จ'
        })
        apiGetStore()
        setImageobj("")
    }

    return (
        <div className={`${st.column_box_product} animate-[fade_0.3s_ease-in-out]`}>
            <div className={`${st.text_box_top} flex justify-between`}>
                <p>ลงสินค้า</p>
            </div>
            <div className={`max-h-[430px] overflow-auto px-8 ${st.displayScroller}`}>
                <div className="">
                    <p className='font-bold text-lg mt-4 text-left'>ข้อมูลส่วน Member</p>
                </div>
                <div className={`flex md-to-opx:flex-wrap justify-center items-center gap-4 mt-4 `}>
                    {imageObj.first
                        ? (
                            <img
                                className=" object-cover flex justify-center items-center text-sm cursor-pointer w-[25%] h-[220px] bg-[#D9D9D9] rounded "
                                alt="image-first"
                                src={imageObj.first}
                                onClick={() => inputFirstImage.current.click()}
                            />
                        ) : (
                            <div
                                className="object-cover flex justify-center items-center text-sm cursor-pointer w-[25%] h-[220px] bg-[#D9D9D9] rounded "
                                onClick={() => inputFirstImage.current.click()}>
                                <i className="text-4xl fa-regular fa-image"></i>
                            </div>
                        )}
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept=".jpg,.jpeg,.png,.webp"
                        ref={inputFirstImage}
                        onChange={(e) => inputImageOnChange(e, "first")}
                    />
                    {imageObj.second
                        ? (
                            <img
                                src={imageObj.second}
                                alt="image-second"
                                className="object-cover flex justify-center items-center text-sm cursor-pointer w-[25%] h-[220px] bg-[#D9D9D9] rounded "
                                onClick={() => inputSecondImage.current.click()}
                            />
                        ) : (
                            <div
                                className="object-cover flex justify-center items-center text-sm cursor-pointer w-[25%] h-[220px] bg-[#D9D9D9] rounded "
                                onClick={() => inputSecondImage.current.click()}>
                                <i className="text-4xl fa-regular fa-image"></i>
                            </div>
                        )}
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept=".jpg,.jpeg,.png,.webp"
                        ref={inputSecondImage}
                        onChange={(e) => inputImageOnChange(e, "second")}
                    />
                    <form className='flex flex-col  justify-start md-to-opx:w-[70%] items-start'>
                        <div className="column-label">
                            <label>ราคา</label>
                            <label> BTH</label>
                        </div>
                        <input className='p-2 bg-white border-2 border-[#747474] rounded-lg'
                            value={formProduct.price_premium}
                            maxLength={10}
                            onChange={(e) => {
                                if (
                                    /^[0-9]+$/.test(e.target.value) ||
                                    e.target.value == ""
                                ) { setFormProduct({ ...formProduct, price_premium: e.target.value }) }
                            }} />
                        <label>ชื่อ</label>
                        <input className='p-2  bg-white border-2 border-[#747474] rounded-lg'
                            value={formProduct.name_premium}
                            maxLength={50}
                            onChange={(e) => {
                                setFormProduct({ ...formProduct, name_premium: e.target.value })
                            }
                            } />
                        <label>รายละเอียดสินค้า</label>
                        <textarea className='h-[3rem] p-2 md-to-opx:w-full bg-white border-2 border-[#747474] rounded-lg'
                            value={formProduct.content_premium}
                            onChange={(e) => setFormProduct({ ...formProduct, content_premium: e.target.value })}>
                        </textarea>
                    </form>
                </div>
            </div>
            <div className="flex flex-row justify-end mr-6 gap-1 my-auto items-center">
                <input className="check-input"
                    type="checkbox"
                    defaultValue={formProduct.clip}
                    onChange={(e) => setFormProduct({ ...formProduct, clip: 'yes' })}
                />
                <label >มีคลิป</label>
            </div>
            <div className="column-button gap-2 flex flex-row justify-center my-3">
                <button
                    style={{
                        width: "120px",
                        height: "30px",
                        background: "linear-gradient(180deg, #FF95B5 0%, #C93A87 100%)",
                        borderRadius: "50px",
                        border: "none",
                        fontize: "16px",
                        color: "white",
                        cursor: "pointer"
                    }}
                    className="btn-left hover:bg-pink-800" onClick={() => handleClickCreateProduct()}>โพสต์</button>
            </div>
        </div>
    )
}
