import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'

function Content() {
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
        <div className="h-screen flex-1 p-7 pt-12 max-h-screen overflow-auto">
        <h1 className="text-2xl font-semibold ">Manage Content </h1>
   
        <div className="overflow-x-auto relative mt-5">
            {contentList !== undefined && contentList.length > 0 &&
                <Table data={contentList} rowsPerPage={10} />
            }
        </div>
    </div>
    )
}

export default Content