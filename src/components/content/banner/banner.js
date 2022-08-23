import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import st from '../../../styles/allUse/content.module.scss'

export default function Banner() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [bannerList, setBannerList] = useState()

    useEffect(() => {
        apiGetBanner()
    }, [])
    async function apiGetBanner() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/content/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.banner);
            if (res.data.status) {
                setBannerList(res.data.banner)
            }
        })
    }


    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            {/* <p className={st.title}>จัดการบทความ</p> */}
            <div className={st.contentTable}>
                {bannerList !== undefined && bannerList.length > 0 &&
                    <Table data={bannerList} rowsPerPage={10} apiGetBanner={apiGetBanner} />
                }
            </div>
        </div>
    )
}
