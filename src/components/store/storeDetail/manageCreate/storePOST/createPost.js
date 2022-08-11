import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import FormData from 'form-data'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import st from '../scss/allPost.module.scss'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: true,
})

export default function CreatePost({apiGetStore}) {
  const query = new URLSearchParams(useLocation().search);
  const [storeCode, setStoreCode] = useState(query.get('storeCode'))
  const access_token = useSelector((state) => (state.app.access_token))
  const apiUrl = useSelector((state) => (state.app.apiPath))
  const inputFirstImage = useRef([])
  const inputSecondImage = useRef([])
  const inputThirdImage = useRef([])
  const inputFourthImage = useRef([])
  const [imageObj, setImageobj] = useState({})
  const [caption, setCaption] = useState("")

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

  function handleClickCreatePost() {
    const formData = new FormData()
    formData.append("image", inputFirstImage.current.files[0])
    formData.append("image", inputSecondImage.current.files[0])
    formData.append("image", inputThirdImage.current.files[0])
    formData.append("image", inputFourthImage.current.files[0])
    formData.append("caption", caption)
    formData.append("storeCode", storeCode)

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
        createPost(formData)
      } else {
        setCaption("")
        setImageobj("")      }
    })
  }

  async function createPost(params) {
    await axios({
      method: 'POST',
      url: `${apiUrl}/api/admin/storePost/create`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data"
      },
      data: params
    })
    Toast.fire({
      icon: 'success',
      title: 'สำเร็จ'
    }).then(() => {
      apiGetStore()
      setEmptyForm()
    })
  }

  function setEmptyForm(){
    setCaption("")
    setImageobj("")

  }
  return (
    <div className={`${st.column_box_product} animate-[fade_0.3s_ease-in-out]`}>
      <div className={`${st.text_box_top} flex justify-between`}>
        <p >โพสต์</p>
        <div className="flex items-center gap-3 pl-8 my-auto">
          <div className="detail-text">
          </div>
          <i className="fa-solid fa-calendar-days"></i>
          <FormetDate dateTime={new Date()} />
        </div>
      </div>
      <div className={`flex flex-wrap justify-center gap-4 mt-4 py-4 h-[540px] overflow-auto ${st.displayScroller}`}>
        {imageObj.first
          ? (
            <img
              className=" object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
              alt="image-first"
              src={imageObj.first}
              onClick={() => inputFirstImage.current.click()}
            />
          ) : (
            <div
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
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
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
              onClick={() => inputSecondImage.current.click()}
            />
          ) : (
            <div
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
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
        {imageObj.third
          ? (
            <img
              src={imageObj.third}
              alt="image-third"
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
              onClick={() => inputThirdImage.current.click()}
            />
          ) : (
            <div
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
              onClick={() => inputThirdImage.current.click()}>
              <i className="text-4xl fa-regular fa-image"></i>
            </div>
          )}
        <input
          type="file"
          style={{ display: 'none' }}
          accept=".jpg,.jpeg,.png,.webp"
          ref={inputThirdImage}
          onChange={(e) => inputImageOnChange(e, "third")}
        />
        {imageObj.fourth
          ? (
            <img
              src={imageObj.fourth}
              alt="image-fourth"
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
              onClick={() => inputFourthImage.current.click()}
            />
          ) : (
            <div
              className="object-cover flex justify-center items-center text-sm cursor-pointer w-[22%] h-[250px] sm:h-[160px] bg-[#D9D9D9] rounded "
              onClick={() => inputFourthImage.current.click()}>
              <i className="text-4xl fa-regular fa-image"></i>
            </div>
          )}
        <input
          type="file"
          style={{ display: 'none' }}
          accept=".jpg,.jpeg,.png,.webp"
          ref={inputFourthImage}
          onChange={(e) => inputImageOnChange(e, "fourth")}
        />

        <form className='flex flex-col justify-center w-[70%] items-center'>
          <label>แคปชั่น (Caption)</label>
          <textarea className='p-2 w-full bg-white border-2 border-[#747474] rounded-lg'
            style={{ padding: '0.7rem' }}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}></textarea>
        </form>
      </div>
      <div className="column-button gap-2 flex flex-row justify-center mb-3">
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
          className="btn-left hover:bg-pink-800" onClick={() => handleClickCreatePost()}>โพสต์</button>
      </div>
    </div>
  )
}
