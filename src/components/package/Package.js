import { useState } from 'react'
import { Tab } from '@headlessui/react'
import st from '../../styles/package/package.module.scss'
import AllPackage from './allPackage'
import EditPackage from './editPackage/editPackage'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Package() {
    let [categories] = useState({
        'แพ็คเก็จทั้งหมด': [],
        'แก้ไขแพ็คเก็จ': [],
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
                            <AllPackage />
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white',
                                'ring-white ring-opacity-60 ring-offset-2 '
                            )}
                        >
                            <EditPackage />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
