import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function UploadVideo({ videoPath }) {
    const query = new URLSearchParams(useLocation().search);
    const [storeCode, setStoreCode] = useState(query.get('storeCode'))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))

    const inputStoreVideo = useRef([])
    const [videoFile, setVideoFile] = useState([])

    function inputVideoOnChange(e) {
        if (!e.target.files.length) {
            return false;
        }
        if (e.target.files[0].type) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setVideoFile(URLs);
        }
    }


    function handleConUpload() {
        Swal.fire({
            icon: 'question',
            position: 'center',
            title: 'ยืนยันการอัปโหลด',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                const formData = new FormData()
                formData.append('video', inputStoreVideo.current.files[0])
                formData.append('storeCode', storeCode)
                apiCreateVideo(formData)
            }
        })
    }

    async function apiCreateVideo(params) {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/store/videoUpload`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: params
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'อัปโหลดแล้ว'
            })
        })
    }

    return (
        <div className='flex justify-center flex-col items-center'>
            <label className="block text-left text-gray-500 font-bold md:text-right md:mb-1 pr-4" >
                อัปโหลดวิดีโอร้านค้า
            </label>
            {videoFile.length > 0
                ? (
                    <video
                        controls
                        autoPlay
                        muted
                        loop
                        className=" object-cover flex justify-center items-center text-sm cursor-pointer w-[auto] h-[220px] bg-[#D9D9D9] rounded "
                        alt="videoStore"
                        src={videoFile}
                        type="video/mp4"
                        onClick={() => inputStoreVideo.current.click()}
                    />
                ) : <video
                    controls
                    autoPlay
                    muted
                    loop
                    className=" object-cover flex justify-center items-center text-sm cursor-pointer w-[auto] h-[220px] bg-[#D9D9D9] rounded "
                    alt="videoStore"
                    src={`${apiUrl}/${videoPath}`}
                    type="video/mp4"
                    poster='/assets/empty.png'
                    onClick={() => inputStoreVideo.current.click()}
                />
            }
            <input
                type="file"
                style={{ display: 'none' }}
                accept=".mp4"
                ref={inputStoreVideo}
                onChange={(e) => inputVideoOnChange(e)}
            />
            {videoFile.length > 0 &&
                <button type="button" className="text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center m-2 dark:focus:ring-yellow-900"
                    onClick={handleConUpload}
                >อัปโหลด</button>
            }
        </div>
    )
}
