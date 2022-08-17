import React from 'react'

export default function Dashboard() {
    return (
        <div className='w-full  h-[27rem]' style={{ background: 'linear-gradient(180deg, #C93A87 0%, #FF95B5 80%)' }}>
            <div className="h-screen flex-1 p-4 gap-2 max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
                <p className="text-xl font-semibold m-6 text-left text-white">Dashboard</p>
                <div className='flex flex-col gap-10 w-[90%] mx-auto'>
                    <div className='flex flex-row mx-auto gap-2 flex-wrap justify-center'>
                        <div className="sm:min-w-[8rem] min-w-[18rem] h-[150px] rounded bg-slate-100 hover:shadow-lg hover:shadow-red-100 duration-100">
                            <div className="flex justify-between items-center px-4 h-[70%] w-full bg-red-500/70 rounded-t ">
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-users"></i>
                                <p className='text-white text-xl font-bold'>{'1,350'}</p>
                            </div>
                            <div className="flex justify-between items-center px-4 h-[30%] w-full bg-red-500/50 rounded-b ">
                                <p className='text-white font-bold'>MEMBER</p>
                            </div>
                        </div>
                        <div className="sm:min-w-[8rem] min-w-[18rem] h-[150px] rounded bg-slate-100 hover:shadow-lg hover:shadow-green-100 duration-100">
                            <div className="flex justify-between items-center px-4 h-[70%] w-full bg-green-500/70 rounded-t ">
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-shop"></i>
                                <p className='text-white text-xl font-bold'>{293}</p>
                            </div>
                            <div className="flex justify-between items-center px-4 h-[30%] w-full bg-green-500/50 rounded-b ">
                                <p className='text-white font-bold'>STORE</p>
                            </div>
                        </div>
                        <div className="sm:min-w-[8rem] min-w-[18rem] h-[150px] rounded bg-slate-100 hover:shadow-lg hover:shadow-yellow-100 duration-100">
                            <div className="flex flex-col justify-center px-4 h-[70%] w-full bg-yellow-500/70 rounded-t ">
                                <div className="flex flex-row justify-between">
                                    <i className="text-white my-auto text-sm duration-200 fa-solid fa-users"></i>
                                    <p className='text-white text-sm my-auto font-bold'>MEMBER</p>
                                    <p className='text-white text-md font-bold'>{70}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <i className="text-white my-auto text-sm duration-200 fa-solid fa-users"></i>
                                    <p className='text-white text-sm my-auto font-bold'>PREMIUM</p>
                                    <p className='text-white text-md font-bold'>{70}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <i className="text-white my-auto text-sm duration-200 fa-solid fa-users"></i>
                                    <p className='text-white text-sm my-auto font-bold'>EXCLUSIVE</p>
                                    <p className='text-white text-md font-bold'>{70}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-4 h-[30%] w-full bg-yellow-500/50 rounded-b ">
                                <p className='text-white font-bold'>PACKAGE</p>
                            </div>
                        </div>
                        <div className="sm:min-w-[8rem] min-w-[18rem] h-[150px] rounded bg-slate-100 hover:shadow-lg hover:shadow-purple-100 duration-100">
                            <div className="flex justify-between items-center px-4 h-[70%] w-full bg-purple-500/70 rounded-t ">
                                <i className="text-white text-4xl hover:text-[50px] duration-200 fa-solid fa-check"></i>
                                <p className='text-white text-xl font-bold'>{10}</p>
                            </div>
                            <div className="flex justify-between items-center px-4 h-[30%] w-full bg-purple-500/50 rounded-b ">
                                <p className='text-white font-bold'>{'รออนุมัติ'}</p>
                            </div>
                        </div>


                    </div>
                    <div className='flex flex-row mx-auto gap-2 flex-wrap w-full drop-shadow-md'>
                        <div className="mx-auto p-2 flex justify-center items-center sm:w-full w-[60%] h-[24rem] rounded bg-white drop-shadow-md">
                            <div className='w-full h-full bg-slate-200 rounded-sm'>1</div>
                        </div>
                        <div className="mx-auto p-2 flex justify-center items-center sm:w-full w-[39%] h-[24rem] rounded bg-white drop-shadow-md">
                            <div className='w-full h-full bg-slate-200 rounded-sm'>2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
