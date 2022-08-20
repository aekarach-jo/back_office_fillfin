import Chart from 'chart.js/auto';
import React, { useEffect } from 'react'
import st from '../../styles/dashboard/dashboard.module.scss'

const mockBesseller = [
    { id: 1, storeName: 'ร้านยายสี', sellNumber: Math.random() * 100},
    { id: 2, storeName: 'ร้านพี่เบิ้ม', sellNumber: Math.random() * 100},
    { id: 3, storeName: 'ร้านมีตังค์', sellNumber: Math.random() * 100},
    { id: 4, storeName: 'ร้านยิ้ม', sellNumber:   Math.random() * 100},
    { id: 5, storeName: 'ร้านออมทรัพย์', sellNumber: Math.random() * 100},
    { id: 6, storeName: 'รั้านน้องพร', sellNumber: Math.random() * 100},
    { id: 7, storeName: 'ร้านน้องมด', sellNumber: Math.random() * 100},
    { id: 8, storeName: 'ร้านน้องฟิว', sellNumber: Math.random() * 100},
    { id: 9, storeName: 'ร้านน้องสมาย', sellNumber: Math.random() * 100},
    { id: 10, storeName: 'ร้านป้าแจ่ม', sellNumber: Math.random() * 100},
    { id: 11, storeName: 'ร้านป้าแจ่ม', sellNumber: Math.random() * 100},
    { id: 12, storeName: 'ร้านป้าแจ่ม', sellNumber: Math.random() * 100},
    { id: 13, storeName: 'ร้านป้าแจ่ม', sellNumber: Math.random() * 100},
]

export default function Dashboard() {

    useEffect(() => {
        console.log(mockBesseller);
        barChart()
        polarChart()
    }, [])

    function polarChart() {
        let label = []
        let data = []
        for (let item of mockBesseller) {
            label.push(item.storeName)
            data.push(item.sellNumber)
        }
        const ctx = document.getElementById('polarChart');
        const myChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: label,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
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
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function barChart() {
        let label = []
        let data = []
        for (let item of mockBesseller) {
            label.push(item.storeName)
            data.push(item.sellNumber)
        }
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: label,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
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
                <p className={st.title}>Dashboard</p>
                <div className={st.flexCol}>
                    <div className={st.flexRow}>
                        <div className={`${st.box} hover:shadow-red-100`}>
                            <div className={`${st.boxBg} bg-red-500/70`}>
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-users"></i>
                                <p className='text-white text-xl font-bold'>{'1,350'}</p>
                            </div>
                            <div className={`${st.boxFooter} bg-red-500/50`}>
                                <p className='text-white font-bold'>MEMBER</p>
                            </div>
                        </div>
                        <div className={`${st.box} hover:shadow-green-100`}>
                            <div className={`${st.boxBg} bg-green-500/70 `}>
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-shop"></i>
                                <p className='text-white text-xl font-bold'>{293}</p>
                            </div>
                            <div className={`${st.boxFooter} bg-green-500/50 `}>
                                <p className='text-white font-bold'>STORE</p>
                            </div>
                        </div>
                        <div className={`${st.box} hover:shadow-yellow-100`}>
                            <div className={`${st.boxBg} bg-yellow-500/70`}>
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-shop"></i>
                                <p className='text-white text-xl font-bold'>{293}</p>

                            </div>
                            <div className={`${st.boxFooter} bg-yellow-500/50`}>
                                <p className='text-white font-bold'>PACKAGE</p>
                            </div>
                        </div>
                        <div className={`${st.box} hover:shadow-purple-100`}>
                            <div className={`${st.boxBg} bg-purple-500/70`}>
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-check"></i>
                                <p className='text-white text-xl font-bold'>{10}</p>
                            </div>
                            <div className={`${st.boxFooter} bg-purple-500/50 `}>
                                <p className='text-white font-bold'>{'รออนุมัติ'}</p>
                            </div>
                        </div>


                    </div>
                    <div className={st.flexRowChart}>
                        <div className={st.barChart}>
                            <div className={st.chart}>
                                <div className={st.titleChart}>Bar chart จำนวนออเดอร์ จำนวน/วัน</div>
                                <canvas id="myChart" ></canvas>
                            </div>
                        </div>
                        <div className={st.polarChart}>
                            <div className={st.chart}>
                                <div className={st.titleChart}>10 อันดับร้านค้าขายดี</div>
                                <div className={st.overFlow}>
                                    {mockBesseller?.map((data, index) => (
                                        <div key={index} className='flex flex-row justify-between mb-2 mx-4'>
                                            <div className=''>
                                                {data.storeName}
                                            </div>
                                            <div>
                                                {data.sellNumber.length}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={st.flexRowChart}>
                        <div className={st.polarChart}>
                            <div className={st.chart}>
                                <div>
                                    Polar Area Chart จำนวนคนที่สมัครแพ็คเก็จ
                                    <canvas id="polarChart" ></canvas>
                                </div>
                            </div>
                        </div>
                        <div className={st.barChart}>
                            <div className={st.chart}>
                                Bar chart ผู้ใช้งานที่สมัคร จำนวน/เดือน
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
