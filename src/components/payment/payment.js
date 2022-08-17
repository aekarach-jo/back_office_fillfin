import { Tab } from '@headlessui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import AllPayment from './paymentOrder/allPayment'
import PaymentOrder from './paymentOrder/paymentOrder'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Payment() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [memberList, setMemberList] = useState([])
    const [pendingMemberList, setPendingMemberList] = useState([])
    const memArr = useRef([])
    const pendingMemArr = useRef([])

    console.log({memberList,pendingMemberList});
    useEffect(() => {
        apiGetPaymentOrder()
    }, [])

    async function apiGetPaymentOrder() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/packageOrder/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.order);
            if (res.data.status) {
                for (let statusPay of res.data.order) {
                    if (statusPay.status_payment == 'confirm') {
                        memArr.current.push(statusPay)
                    } else {
                        pendingMemArr.current.push(statusPay)
                    }
                }
                setMemberList(memArr.current)
                setPendingMemberList(pendingMemArr.current)
            }
        })
    }


    let [categories] = useState({
        'บัญชีรออนุมัติ': [],
        'บัญชีทั้งหมด': [],
    })

    return (
        <div className="h-screen flex-1 p-4 pt-12  max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            <div className='flex flex-col gap-2 flex-wrap justify-center pt-6 max-w-[1100px] mx-auto'>
                <Tab.Group>
                    <Tab.List className="w-[220px] h-[35px] flex flex-row mx-auto space-x-1 rounded-xl bg-pink-900/20 p-1">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg  text-sm font-bold leading-5 text-pink-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow  animate-[fade_0.3s_ease-in-out] '
                                            : 'text-pink-100 hover:bg-white/[0.12] hover:text-white '
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels >
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white ',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <PaymentOrder pendingMemberList={pendingMemberList} />

                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <AllPayment memberList={memberList} />

                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}