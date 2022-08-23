import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import st from '../../../styles/allUse/content.module.scss'

function Ads() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [contentData, setContentData] = useState()
    const [refreshData, setRefreshData] = useState(false)

    useEffect(() => {
        if (!contentData) {
            apiGetContent()
        }
    }, [])

    async function apiGetContent() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/content/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.status) {
                setContentData(res.data)
            }
        })
    }

    if (!contentData) {
        return <div>ไม่พบข้อมูล</div>

    }    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            {/* <p className={st.title}>จัดการบทความ</p> */}
            <div className={st.contentTable}>
                {contentData &&
                    <Table adsList={contentData.ads} position={contentData.adsPosition} rowsPerPage={10} apiGetContent={apiGetContent} />
                }
            </div>
        </div>
    )
}

export default Ads;