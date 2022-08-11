import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Editor from './editor';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

export default function ContentDetail() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate()
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [contentType, setContentType] = useState(query.get('type'))

    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [h1, setH1] = useState()
    const [h2, setH2] = useState()
    const [type, setType] = useState()
    const [content, setContent] = useState()
    const [imageLink, setImageLink] = useState('')

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
        apiGetContent()
        console.log(contentType);
    }, [])

    async function apiGetContent() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/content/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            for (let content of res.data.content) {
                if (contentType == content.type) {
                    console.log(content);
                    setId(content.id)
                    setTitle(content.title)
                    setH1(content.h1)
                    setH2(content.h2)
                    setType(content.type)
                    setContent(content.content)
                    setImageLink(content.image_link)
                }
            }
        })
    }

    function handleEdit() {
        Swal.fire({
            title: 'ยืนยันการแก้ไข',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#C93A87",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                apiEditContent()
            }
        })
    }

    async function apiEditContent() {
        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/content/update`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                id: id,
                title: title,
                h1: h1,
                h2: h2,
                type: type,
                content: content,
                image_link: imageLink
            })
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขแล้ว'
            })
        })
    }
    return (
        <div className='h-screen flex-1 4 pt-12 max-h-screen overflow-auto animate-[fade_.3s_ease-in-out]'>
            <h1 className="text-2xl font-semibold ">{contentType}</h1>
            <div className="relative m-3 text-left gap-2 flex align-middle ">
                <button onClick={() => navigate(-1)} className='flex gap-2 align-center ' >
                    <i className="flex my-auto text-pink-500 hover:text-[21px] duration-200 cursor-pointer text-xl fa-solid fa-circle-arrow-left" ></i>
                    <p className='text-pink-500 '>Back to content</p>
                </button>
            </div>
            <form className="relative my-5 border-2 rounded-lg p-8 max-w-[1100px] mx-auto">
                <h2 className="text-left block my-2 font-bold text-gray-900 dark:text-gray-300"
                >Title</h2>
                <input
                    type="text"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 w-2/5 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {(contentType !== 'terms-of-service' &&
                    contentType !== 'privacy-policy') &&
                    <>
                        <h2 className="text-left block my-2 font-bold text-gray-900 dark:text-gray-300"
                        >Description</h2>
                        <textarea
                            type="text"
                            defaultValue={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="bg-gray-50 w-2/5 h-28 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                        <h2 className="text-left block my-2 font-bold text-gray-900 dark:text-gray-300"
                        >Type Description</h2>
                        <input
                            type="text"
                            defaultValue={h1}
                            onChange={(e) => setH1(e.target.value)}
                            className="bg-gray-50 w-2/5 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <h2 className="text-left block my-2 font-bold text-gray-900 dark:text-gray-300"
                        >Note</h2>
                        <input
                            type="text"
                            defaultValue={h2}
                            onChange={(e) => setH2(e.target.value)}
                            className="bg-gray-50 w-2/5 border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </>
                }

                {(contentType === 'terms-of-service' ||
                    contentType === 'privacy-policy') &&
                    <>
                        <div className='my-0'>
                            <h2 className="text-left block my-2 font-bold text-gray-900 dark:text-gray-300"
                            >Content</h2>
                            <Editor
                                value={content}
                                name="description"
                                onChange={(data) => {
                                    setContent(data);
                                }}
                                editorLoaded={editorLoaded}
                            />
                        </div>
                        {/* {JSON.stringify(content)} */}
                    </>
                }
            <button
                type="button"
                className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                onClick={() => handleEdit()}
            >แก้ไข</button>
            </form>
        </div >
    )
}
