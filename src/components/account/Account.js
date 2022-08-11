import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table';

function Account() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [memberList, setMemberList] = useState()
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
        <div className="h-screen flex-1 p-4 pt-12 max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            <h1 className="text-2xl font-semibold ">Manage Account </h1>
            <div className="relative mt-3">
                <input maxLength={10} onChange={e => setSearchText(e.target.value)} type="text" className='border-2 rounded flex px-3' placeholder='ค้นหาชื่อผู้ใช้' style={{ margin: "0 0 0 auto" }} />
                <i className="absolute right-3 text-gray-500/25 top-1.5 fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="overflow-x-auto relative mt-5 max-w-[1100px] mx-auto border-2 rounded-lg ">
                {memberList !== undefined && memberList.length > 0 &&
                    <Table data={memberList} rowsPerPage={10} searchText={searchText} />
                }
            </div>
        </div>
    )
}

export default Account