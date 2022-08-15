import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'

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
        <div className="h-screen flex-1 p-4 pt-12 max-h-screen overflow-auto animate-[fade_.3s_ease-in-out]">
        <h1 className="text-2xl font-semibold ">Manage admin </h1>
   
        <div className="overflow-x-auto relative mt-10 max-w-[1100px] mx-auto border-2 rounded-lg">
            {adminList !== undefined && adminList.length > 0 &&
                <Table data={adminList} rowsPerPage={10} apiGetAdmin={apiGetAdmin}/>
            }
        </div>
    </div>
    )
}

export default Admin;