import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import st from '../../styles/allUse/content.module.scss'

function Admin() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [adminList, setAdminList] = useState([])

    useEffect(() => {
        console.log(adminList);
        apiGetAdmin()
    }, [])
    async function apiGetAdmin() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.admin);
            if (res.data.status) {
                setAdminList(res.data.admin)
            }
        })
    }


    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>จัดการบัญชีแอดมิน </p>
            <div className={st.contentTable}>
                {adminList !== undefined && adminList.length > 0 &&
                    <Table data={adminList} rowsPerPage={10} apiGetAdmin={apiGetAdmin} />
                }
            </div>
        </div>
    )
}

export default Admin;