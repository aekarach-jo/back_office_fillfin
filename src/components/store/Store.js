import axios from 'axios'
import { Tab } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import StoreGender from './storeGender'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
})

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Store() {
    const [gender, setGender] = useState('men')
    useEffect(() => {console.log(gender);},[gender])

    let [categories] = useState({
        'men': [],
        'women':  [],
    })

    return (
        <div className="h-screen flex-1 p-4 pt-12  max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            <h1 className="text-2xl font-semibold">Manage store</h1>
            <div className='flex flex-col gap-2 flex-wrap justify-center items-center pt-6 max-w-[1100px] mx-auto'>
                <Tab.Group>
                    <Tab.List className="w-[220px] h-[35px] flex space-x-1 rounded-xl bg-pink-900/20 p-1">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                onClick={() => (setGender(category), localStorage.setItem('store_gender', category))}
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
                            <StoreGender gender={gender} />
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <StoreGender gender={gender} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>

    )
}

export default Store