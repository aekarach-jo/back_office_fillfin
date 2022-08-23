import axios from 'axios';
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import st from '../../styles/dashboard/dashboard.module.scss'
import { Link } from "react-router-dom";

export default function Dashboard() {
    const access_token = useSelector((state) => (state.app.access_token))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [orderList, setOrderList] = useState([])
    const [memberPerMonth, setMemberPerMonth] = useState([])
    const [totalPerPack, setTotalPerPack] = useState([])
    const [todayOrder, setTodayOrder] = useState([])
    const [isFetchSuccess, setIsFetchSuccess] = useState(false)
    const [topDashboard, setTopDashboard] = useState({})

    useEffect(() => {

        apiGetDashboarb()
        if (isFetchSuccess) {
            polarChart()
            chartMemberPerMonth()
        }
    }, [isFetchSuccess])

    async function apiGetDashboarb() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/getDashboard`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res) => {
            if (res.data.status) {
                console.log(res.data);
                let orderSuccess = []
                for (let item of res.data.orderAll) {
                    // if (item.status == 'success') {
                    orderSuccess.push(item)
                    // }
                }
                setOrderList(orderSuccess.sort((a, b) => b.totalPrice - a.totalPrice))
                setMemberPerMonth(res.data.memberPerMonth)
                setTotalPerPack(res.data.totalPerPack)
                setTodayOrder(res.data.toDayOrder)
                setTopDashboard(res.data.forTopDashboard)
                setIsFetchSuccess(true)
            }
        })
    }

    function polarChart() {
        let label = []
        let data = []
        for (let item of totalPerPack) {
            label.push(item.packageName)
            data.push(item.totalMember)
        }
        const ctx = document.getElementById('polarChart');
        const myChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: label,
                datasets: [{
                    // label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                // plugins: {
                //     legend: {
                //         display: false
                //     }
                // }
            }
        });
    }

    function chartMemberPerMonth() {
        let label = []
        let data = []
        for (let item of memberPerMonth) {
            label.push(item.month)
            data.push(item.total)
        }
        const ctx = document.getElementById('memberPerMonth');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    // label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(251, 36, 36, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return (
        <div className={st.content}>
            <div className={`${st.contentBody} animate-[fade_0.3s_ease-in-out]`}>
                <p className={st.title}></p>
                <div className={st.flexCol}>
                    <div className={st.flexRow}>
                        <Link to='/payment'>
                            <div className={`${st.box} hover:shadow-red-100 hover:cursor-pointer`}>
                                <div className={`${st.boxBg} bg-red-500/70`}>
                                    <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-users"></i>
                                    <p className='text-white text-xl font-bold'>{topDashboard.newMember}</p>
                                </div>
                                <div className={`${st.boxFooter} bg-red-500/50`}>
                                    <p className='text-white font-bold'>MEMBER</p>
                                </div>
                            </div>
                        </Link>
                        <Link to='/store'>
                            <div className={`${st.box} hover:shadow-green-100 hover:cursor-pointer`}>
                                <div className={`${st.boxBg} bg-green-500/70 `}>
                                    <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-shop"></i>
                                    <p className='text-white text-xl font-bold'>{topDashboard.newStore}</p>
                                </div>
                                <div className={`${st.boxFooter} bg-green-500/50 `}>
                                    <p className='text-white font-bold'>STORE</p>
                                </div>
                            </div>
                        </Link>
                        <Link to='/order'>
                            <div className={`${st.box} hover:shadow-yellow-100 hover:cursor-pointer`}>
                                <div className={`${st.boxBg} bg-yellow-500/70`}>
                                    <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-shop"></i>
                                    <p className='text-white text-xl font-bold'>{topDashboard.newOrder}</p>
                                </div>
                                <div className={`${st.boxFooter} bg-yellow-500/50`}>
                                    <p className='text-white font-bold'>ORDER</p>
                                </div>
                            </div>
                        </Link>
                        <Link to='/livechat'>
                            <div className={`${st.box} hover:shadow-purple-100 hover:cursor-pointer`}>
                                <div className={`${st.boxBg} bg-purple-500/70`}>
                                    <i className="text-white text-4xl hover:text-[50px] duration-200 fa-brands fa-rocketchat"></i>
                                    <p className='text-white text-xl font-bold'>{topDashboard.newChat}</p>
                                </div>
                                <div className={`${st.boxFooter} bg-purple-500/50 `}>
                                    <p className='text-white font-bold'>Chat</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={st.flexTopRow}>
                        <div className={st.orderList}>
                            <div className={st.box}>
                                <div className={st.titleBest}>ออเดอร์วันนี้</div>
                                <div className={st.overFlow}>
                                    <>
                                        <div className='flex flex-row justify-between mb-4 bg-gray-200/50 p-1'>
                                            <div className=''>
                                                เลขออเดอร์
                                            </div>
                                            <div className=''>
                                                สถานะการชำระเงิน
                                            </div>
                                            <div className=''>
                                                สถานะขนส่ง
                                            </div>
                                            <div>
                                                ราคารวม
                                            </div>
                                        </div>
                                        {todayOrder?.map((data, index) => (
                                            <div key={index}>
                                                <div key={index} className='flex flex-row justify-between mb-2 mx-2'>
                                                    <div>
                                                        {data.orderNumber}
                                                    </div>
                                                    <div className={`
                                                     ${data.paymentStatus == 'pending' && 'text-yellow-500'}
                                                     ${data.paymentStatus == 'confirm' && 'text-green-500'}
                                                     ${data.paymentStatus == 'failed' && 'text-red-500 '}
                                                    `}>
                                                        {data.paymentStatus === "pending" && 'รอการยืนยัน'}
                                                        {data.paymentStatus === "confirm" && 'ยืนยันแล้ว'}
                                                        {data.paymentStatus === "failed" && 'ผิดพลาด'}                                                     </div>
                                                    <div className={`
                                                        ${data.status === 'pending' && 'text-yellow-500'}
                                                        ${data.status === 'shipping' && 'text-orange-500'}
                                                        ${data.status === 'success' && 'text-green-500'}
                                                        ${data.status === 'failed' && 'text-red-500 '}
                                                         `}>
                                                        {data.status === "pending" && 'กำลังดำเนินการ'}
                                                        {data.status === "shipping" && 'กำลังส่ง'}
                                                        {data.status === "success" && 'ส่งแล้ว'}
                                                        {data.status === "failed" && 'ผิดลาด'}
                                                    </div>
                                                    <div>
                                                        {data.totalPrice}
                                                    </div>
                                                </div> <hr />
                                            </div>
                                        ))}
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className={st.bestSeller}>
                            <div className={st.box}>
                                <div className={st.titleBest}>10 อันดับร้านค้าขายดี</div>
                                <div className={st.overFlow}>
                                    <>
                                        <div className='flex flex-row justify-between mb-4 bg-gray-200/50 p-1'>
                                            <div className='flex flex-row gap-10'>
                                                <p>ลำดับที่</p>
                                                <p>ร้านค้า</p>
                                            </div>
                                            {/* <div className=''>
                                                จำนวน
                                            </div> */}
                                            <div className='flex flex-row gap-10'>
                                                <p>จำนวน</p>
                                                <p>ยอดรวม</p>
                                            </div>
                                        </div>
                                        {orderList?.map((data, index) => (
                                            <div key={index} >
                                                <div className='flex flex-row justify-between mb-2 mx-4'>
                                                    <div className='flex flex-row gap-10'>
                                                        <p>{index + 1}</p>
                                                        <p>{data.name}</p>
                                                    </div>
                                                    <div className='flex flex-row gap-10'>
                                                        <p>{data.totalProductSold}</p>
                                                        {data.totalPrice}
                                                    </div>
                                                </div><hr />
                                            </div>
                                        ))}
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={st.flexBottomRow}>
                        <div className={st.barChart}>
                            <div className={st.chart}>
                                Bar chart ผู้ใช้งานที่สมัคร จำนวน/เดือน
                                <canvas id="memberPerMonth" ></canvas>
                            </div>
                        </div>
                        <div className={st.polarChart}>
                            <div className={st.chart}>
                                <div>
                                    Polar Area Chart จำนวนคนที่สมัครแพ็คเก็จ
                                    <canvas id="polarChart" ></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
