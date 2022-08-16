import { Tab } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import ReportDetail from './reportDetail/reportDetail'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Report() {
    useEffect(() => {
    }, [])

    let [categories] = useState({
        'รายงานลูกค้า': [],
        'รายงานร้านค้า': [],
        'รายงานออเดอร์': [],
    })

    return (
        <div className="h-screen flex-1 p-4 pt-12  max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            {/* <h1 className="text-2xl font-semibold">Manage report</h1> */}
            <div className='flex flex-col gap-2 flex-wrap justify-center pt-6 max-w-[1100px] mx-auto'>
                <Tab.Group>
                    <Tab.List className="w-[320px] h-[35px] flex flex-row mx-auto space-x-1 rounded-xl bg-pink-900/20 p-1">
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
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white ',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <ReportDetail select={'customerReport'} />
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <ReportDetail select={'storeReport'} />

                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <ReportDetail select={'orderReport'} />

                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}