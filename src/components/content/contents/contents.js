import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import st from '../../../styles/allUse/content.module.scss'

function Contents() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [contentList, setContentList] = useState()

    useEffect(() => {
        apiGetContent()
    }, [])
    async function apiGetContent() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/content/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.content);
            if (res.data.status) {
                setContentList(res.data.content)
            }
        })
    }


    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            {/* <p className={st.title}>จัดการบทความ</p> */}
            <div className={st.contentTable}>
                {contentList !== undefined && contentList.length > 0 &&
                    <Table data={contentList} rowsPerPage={10} apiGetContent={apiGetContent} />
                }
            </div>
        </div>
    )
}

export default Contents;