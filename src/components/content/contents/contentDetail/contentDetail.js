import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Editor from './editor';
import Swal from 'sweetalert2';
import st from '../../../../styles/content/contentDetail.module.scss'

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
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.contentType}>{contentType}</p>
            <div className={st.wrapBtnBack}>
                <button onClick={() => navigate(-1)}>
                    <i className=" fa-solid fa-circle-arrow-left" ></i>
                    <p>Back to content</p>
                </button>
            </div>
            <form className={st.contentBody}>
                <p className={st.textTitle}>Title</p>
                <input
                    type="text"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {(contentType !== 'terms-of-service' &&
                    contentType !== 'privacy-policy') &&
                    <>
                        <p className={st.textTitle}>Description</p>
                        <textarea
                            type="text"
                            defaultValue={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <p className={st.textTitle}>Type Description</p>
                        <input
                            type="text"
                            defaultValue={h1}
                            onChange={(e) => setH1(e.target.value)}
                        />
                        <p className={st.textTitle}>Note</p>
                        <input
                            type="text"
                            defaultValue={h2}
                            onChange={(e) => setH2(e.target.value)}
                        />
                    </>
                }

                {(contentType === 'terms-of-service' ||
                    contentType === 'privacy-policy') &&
                    <>
                        <div className='my-0'>
                            <p className={st.textTitle}>Content</p>
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
                <button className={st.btnEdit} type="button" onClick={() => handleEdit()}>แก้ไข</button>
            </form>
        </div >
    )
}
