import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table';
import st from '../../styles/allUse/content.module.scss'

export default function Order() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))

    const _export = useRef(null)
    const [searchText, setSearchText] = useState("")
    const [orderList, setOrderList] = useState()

    useEffect(() => {
        apiGetOrder()
    }, [])

    async function apiGetOrder() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/orders/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            if (res.data.status) {
                console.log(res.data.order)
                setOrderList(res.data.order)
            }
        })
    }

    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>จัดการออเดอร์</p>
            <div className={st.searchText}>
                <input onChange={e => setSearchText(e.target.value)} type="text" placeholder='ค้นหาออเดอร์' style={{ margin: "0 0 0 auto" }} />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className={st.contentTable}>
                {orderList !== undefined && orderList.length > 0 &&
                    <Table data={orderList} rowsPerPage={11} searchText={searchText} />
                }
            </div>
        </div>

    )
}

