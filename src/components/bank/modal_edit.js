import { Dialog, Listbox, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
})

export default function Modal_edit({ bankData, onSetOpen, setBankData }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [image, setImage] = useState(bankData.image)
    const [name, setName] = useState(bankData.name)
    const [bankNumber, setBankNumber] = useState(bankData.bank_number)
    const [branch, setBranch] = useState(bankData.branch)
    const inputProfileImage = useRef([])
    const [imageObj, setImageobj] = useState(`${apiUrl}${image}`)
    const [bankList, setBankList] = useState()
    const [selectBank, setSelectBank] = useState()

    useEffect(() => {
        apiGetBank()
    }, [])

    async function apiGetBank() {
        const access_token = localStorage.getItem('access_token')
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/bankProvider/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res) => {
            setBankList(res.data.data)
            for (let bank of res.data.data) {
                if (bankData.bank_provider_id == bank.id) {
                    setSelectBank(bank)
                }
            }
        })
    }

    async function onEditBank() {
        const access_token = localStorage.getItem('access_token')
        try {
            await axios({
                method: 'POST',
                url: `${apiUrl}/api/admin/bank/update`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                data: JSON.stringify({
                    bank_id: bankData.id,
                    name: name,
                    bank_number: bankNumber,
                    branch: branch,
                    bank_provider_id: selectBank.id
                })
            }).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'แก้ไขแล้ว'
                })
                onSetOpen()
                setBankData()
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Transition appear show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onSetOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h2"
                                        className="pb-4 text-lg text-xl leading-6 text-gray-900"
                                    >
                                        แก้ไขบัญชี
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form className="w-full max-w-sm">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        ชื่อ นามสกุล
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input onChange={(e) => setName(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500" type="text" defaultValue={name} />
                                                </div>
                                            </div>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                        หมายเลขบัญชี
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input onChange={(e) => setBankNumber(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500" type="text" defaultValue={bankNumber} />
                                                </div>
                                            </div>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        สาขา
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input onChange={(e) => setBranch(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500" type="text" defaultValue={branch} />
                                                </div>
                                            </div>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                        ธนาคาร
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <Listbox value={selectBank} onChange={setSelectBank}>
                                                        {selectBank &&
                                                            <div className="relative mt-1">
                                                                <Listbox.Button className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500">
                                                                    <span className="block truncate text-left">{selectBank.name}</span>
                                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                        <i className="animate-bounce fa-solid fa-arrow-down"></i>
                                                                    </span>
                                                                </Listbox.Button>
                                                                <Transition
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                        {bankList?.map((data) => (
                                                                            <Listbox.Option
                                                                                key={data.id}
                                                                                className={({ active }) =>
                                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                                                    }`
                                                                                }
                                                                                value={data}
                                                                            >
                                                                                {({ selected }) => (
                                                                                    <>
                                                                                        <span
                                                                                            className={`block truncate align-left ${selected ? 'font-medium' : 'font-normal'
                                                                                                }`}
                                                                                        >
                                                                                            {data.name}
                                                                                        </span>
                                                                                        {selected ? (
                                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                                                                                                <i className="fa-solid fa-check"></i>                                                                                            </span>
                                                                                        ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                </Transition>
                                                            </div>
                                                        }
                                                    </Listbox>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onEditBank}
                                        >
                                            แก้ไข
                                        </button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )

}
