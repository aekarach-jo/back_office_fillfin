import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table';

export default function Order() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))

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
                setOrderList(res.data.order)
            }
        })
    }


    return (
        <div className="h-screen flex-1 p-7 pt-12 max-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold ">Manage Order</h1>
            <div className="relative mt-3">
                <input onChange={e => setSearchText(e.target.value)} type="text" className='border-2 rounded flex px-3' placeholder='ค้นหาออเดอร์' style={{ margin: "0 0 0 auto" }} />
                <i className="absolute right-3 text-gray-500/25 top-1.5 fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="overflow-x-auto relative mt-5  max-w-[1100px] mx-auto border-2 rounded-lg">
                {orderList !== undefined && orderList.length > 0 &&
                    <Table data={orderList} rowsPerPage={10} searchText={searchText} />
                }
            </div>
        </div>

    )
}

