import { Tab } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import StoreGender from './storeGender'
import st from '../../styles/store/store.module.scss'

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
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
        <p className={st.title}>จัดการแพ็คเก็จ</p>
        <div className={st.contentTab}>
            <Tab.Group>
                <Tab.List className={st.tabList}>
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            onClick={() => setGender(category)}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg  text-sm font-bold leading-5 text-pink-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow'
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