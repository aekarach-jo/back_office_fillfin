import React, { useState } from 'react'
import Table from './Table'

export default function PaymentOrder({ pendingMemberList }) {
  const [searchText, setSearchText] = useState("")
  return (
    <div className="animate-[fade_0.3s_ease-in-out]">
      <div className="relative ">
        <input maxLength={10} onChange={e => setSearchText(e.target.value)} type="text" className='border-2 rounded flex px-3' placeholder='ค้นหาชื่อผู้ใช้' style={{ margin: "0 0 0 auto" }} />
        <i className="absolute right-3 text-gray-500/25 top-1.5 fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="overflow-x-auto relative mt-5 mx-auto border-2 rounded-lg ">
        {pendingMemberList.length > 0 &&
          <Table data={pendingMemberList} rowsPerPage={12} searchText={searchText} />
        }
      </div>
    </div>
  )
}
