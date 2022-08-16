import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReportMember from './Table/reportMember'
import { useSelector } from 'react-redux'
import ReportOrsers from './Table/reportOrders'
import ReportStore from './Table/reportStore'
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from 'moment'
moment.locale('th');
export default function ReportDetail({ select }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const _exportData = useRef(`${apiUrl}/api/admin/${select}`)
    const [dataReport, setDataReport] = useState([])
    const [searchText, setSearchText] = useState("")
    const [open, setOpen] = useState(false)
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [reset, setReset] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: null,
            endDate: null,
            key: "selection"
        }
    ]);

    useEffect(() => {
        console.log(reset);
        if (reset) {
            setDate([
                {
                    startDate: null,
                    endDate: null,
                    key: "selection"
                }
            ])
        } else {
            apiGetReport()
        }
    }, [reset])

    async function apiGetReportToExport() {
        await axios({
            method: 'POST',
            url: `${_exportData.current}/export`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                start: date[0].startDate.toLocaleString(),
                end: date[0].endDate.toLocaleString()
            }
        }).then(res => {
            if (res.data.status) {
                window.location = apiUrl + res.data.filepath
            }
        })
    }
    async function apiGetReport() {
        await axios({
            method: 'POST',
            url: `${_exportData.current}/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                start: date[0].startDate ? moment(new Date(date[0].startDate)).format('YYYY-MM-DD HH:mm:ss') : null,
                end: date[0].endDate ? moment(new Date(date[0].endDate)).format('YYYY-MM-DD HH:mm:ss') : null,
            }
        }).then(res => {
            if (res.data.status) {
                setDateStart(date[0].startDate ? moment(new Date(date[0].startDate)).format('DD-MM-YYYY') : null)
                setDateEnd(date[0].endDate ? moment(new Date(date[0].endDate)).format('DD-MM-YYYY') : null)
                setDataReport(res.data.report)
            }
        })
    }

    return (
        <div className=" relative flex-1 p-4 animate-[fade_0.3s_ease-in-out]">
            <div className="relative mb-2">
                <div className='absolute flex flex-row flex-wrap justify-start'>
                    <p className="my-auto">Export Excel ช่วงวันที่</p>
                    <div className='cursor-pointer px-2 h-[1.5rem] bg-gray-200 hover:bg-pink-500 hover:text-white duration-100 rounded m-1' onClick={() => setOpen(!open)}>
                        {dateStart !== null
                            ? <div className="flex flex-row gap-2">
                                <p className=''>เริ่ม</p>
                                <p className="font-bold">{dateStart}</p>
                                <p className=''>ถึง</p>
                                <p className="font-bold">{dateEnd}</p>
                            </div>
                            : "เลือกช่วงวันที่"
                        }
                    </div>
                    {dateStart !== null &&
                        <button className='cursor-pointer animate-[wiggle_0.3s_ease-in-out_infinite] rounded hover:bg-yellow-500 px-1 my-auto duration-100 hover:text-white' onClick={() => setReset(!reset)}>
                            รีเซ็ท
                        </button>
                    }
                </div>
                <input
                    type="text"
                    onChange={e => setSearchText(e.target.value)}
                    className='border-2 rounded flex px-3'
                    placeholder="ค้นหา"
                    style={{ margin: "0 0 0 auto" }} />
                <i className="absolute right-3 text-gray-500/25 top-1.5 fa-solid fa-magnifying-glass"></i>
            </div>
            {
                open &&
                <div className='flex flex-col border-2 rounded-lg z-50 absolute left-4 top-13'>
                    <DateRange
                        date={new Date()}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                    />
                    <button className='bg-pink-300 h-10 rounded-lg' onClick={() => (setOpen(!open), apiGetReport())}>ตกลง</button>
                </div>
            }


            <div className="overflow-x-auto relative  max-w-[1100px] mx-auto border-2 rounded-lg">
                {select == 'customerReport' && dataReport.length > 0 &&
                    <ReportMember data={dataReport} rowsPerPage={13} searchText={searchText} />
                }
                {select == 'storeReport' && dataReport.length > 0 &&
                    <ReportStore data={dataReport} rowsPerPage={10} searchText={searchText} />
                }
                {select == 'orderReport' && dataReport.length > 0 &&
                    <ReportOrsers data={dataReport} rowsPerPage={10} searchText={searchText} />
                }
            </div>
            <button className='flex flex-end gap-1 p-1 mt-3 text-sm font-bold bg-[#0a8342] hover:bg-green-100  border-2 border-green-800 text-white hover:text-green-700 duration-200 ' onClick={apiGetReportToExport}>
                Export รายงาน
                <i className="my-auto fa-solid fa-file-excel"></i>
            </button>
        </div >
    )
}
