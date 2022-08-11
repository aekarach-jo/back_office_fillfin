import React from 'react'

export default function Dashboard() {
    return (
        <div className="h-screen flex-1 p-4 gap-2 max-h-screen overflow-auto animate-[fade_0.3s_ease-in-out]">
            <h1 className="text-2xl font-semibold my-3">Dashboard</h1>
            <div className='flex flex-row gap-3'>
                    <div className="w-[23%] mx-auto h-[100px] rounded bg-slate-400">
                        1
                    </div>
                    <div className="w-[23%] mx-auto h-[100px] rounded bg-slate-500">
                        2
                    </div>
                    <div className="w-[23%] mx-auto h-[100px] rounded bg-slate-600">
                        3
                    </div>
                    <div className="w-[23%] mx-auto h-[100px] rounded bg-slate-700">
                        4
                    </div>
            </div>
            {/* <div class="grid grid-cols-4 gap-4 w-full h-[150px] rounded-lg mb-2">
                <div class="col-2 col-span-2 bg-gray-300">
                    1,2
                </div>
                <div class="col-1  bg-gray-300">
                    3
                </div>
                <div class="col-1 bg-gray-300">
                    4
                </div>

            </div>
            <div class="grid grid-cols-4 gap-4 w-full h-[200px] rounded-lg mb-2">
                <div class="grid grid-rows-2  bg-gray-300">
                    <div class="row-1  bg-gray-400 m-1">
                        1
                    </div>
                    <div class="row-1  bg-gray-600 m-1">
                        2
                    </div>
                </div>
                <div class="col-1 col-span-3 bg-gray-300">
                    3,4
                </div>

            </div>
            <div class="grid grid-cols-4 gap-4 w-full h-[150px] rounded-lg mb-2">
                <div class="col-1 bg-gray-300">
                    1
                </div>
                <div class="col-1 bg-gray-300">
                    2
                </div>
                <div class="col-1  bg-gray-300">
                    3
                </div>
                <div class="col-1 bg-gray-300">
                    4
                </div>

            </div> */}
        </div>
    )
}
