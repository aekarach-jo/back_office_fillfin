import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReportMember from './Table/reportMember'
import { useSelector } from 'react-redux'
import ReportOrsers from './Table/reportOrders'
import ReportStore from './Table/reportStore'
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function ReportDetail({ report, select }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const _exportData = useRef(`${apiUrl}/api/admin/${select}`)
    const [dataReport, setDataReport] = useState([])
    const [searchText, setSearchText] = useState()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    useEffect(() => {
    }, [])

    async function apiGetReport() {
        await axios({
            method: 'POST',
            url: `${_exportData.current}/export`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                start: date[0].startDate,
                end: date[0].endDate
            }
        }).then(res => {
            if (res.data.status) {
                // window.location = apiUrl + res.data.filepath
            }
        })
    }



    return (
        <div className="h-screen relative flex-1 p-4 pt-12 max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            {open &&
                <div className='flex flex-col z-50 absolute right-10 duration-300'>
                    <DateRange
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        color="#3d91ff"
                    />
                    <button className='bg-pink-300 h-10 rounded-lg' onClick={() => setOpen(!open)}>ตกลง</button>
                </div>
            }
            <div className="relative">
            <div className='flex flex-row justify-center'>
                <p>Export Excel ช่วงวันที่</p>
                <button className='w-[4rem] h-[2rem]' onClick={() => setOpen(!open)}>เลือกช่วงวันที่</button>
            </div>
                <input onChange={e => setSearchText(e.target.value)} type="text" className='border-2 rounded flex px-3' placeholder='ค้นหาออเดอร์' style={{ margin: "0 0 0 auto" }} />
                <i className="absolute right-3 text-gray-500/25 top-1.5 fa-solid fa-magnifying-glass"></i>
            </div>

            <button onClick={apiGetReport}>Export</button>
            <div className="overflow-x-auto relative mt-5  max-w-[1100px] mx-auto border-2 rounded-lg">
                {select == 'memberReport' && dataReport.length > 0 &&
                    <ReportMember data={dataReport} rowsPerPage={10} searchText={searchText} />
                }
                {select == 'storeReport' && dataReport.length > 0 &&
                    <ReportStore data={dataReport} rowsPerPage={10} searchText={searchText} />
                }
                {select == 'orderReport' && dataReport.length > 0 &&
                    <ReportOrsers data={dataReport} rowsPerPage={10} searchText={searchText} />
                }
            </div>
        </div>
    )
}
