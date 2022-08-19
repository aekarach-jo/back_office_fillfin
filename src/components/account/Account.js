import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table';
import st from '../../styles/allUse/content.module.scss';

function Account() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [memberList, setMemberList] = useState([])
    const [searchText, setSearchText] = useState("")


    useEffect(() => {
        apiGetMember()
    }, [])

    async function apiGetMember() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/member/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.data);
            if (res.data.status) {
                setMemberList(res.data.data)
            }
        })
    }


    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>จัดการผู้ใช้ </p>
            <div className={st.searchText}>
                <input maxLength={10} onChange={e => setSearchText(e.target.value)} type="text" placeholder='ค้นหาชื่อผู้ใช้' style={{ margin: "0 0 0 auto" }} />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className={st.contentTable}>
                {memberList.length > 0 &&
                    <Table data={memberList} rowsPerPage={12} searchText={searchText} />
                }
            </div>
        </div>
    )
}

export default Account