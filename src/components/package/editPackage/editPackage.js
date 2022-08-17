import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import st from '../../../styles/allUse/content.module.scss'
import Table from './Table'

export default function EditPackage() {
  const apiUrl = useSelector((state) => (state.app.apiPath))
  const access_token = useSelector((state) => (state.app.access_token))

  const [searchText, setSearchText] = useState("")
  const [packageList, setPackageList] = useState([])

  useEffect(() => {
    apiGetPackage()
  }, [])

  async function apiGetPackage() {
    await axios({
      method: 'GET',
      url: `${apiUrl}/api/admin/package/get`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(res => {
      console.log(res);
      if (res.data.status) {
        console.log(res.data.data)
        setPackageList(res.data.data)
      }
    })
  }

  return (
    <div className={`flex-1 overflow-auto animate-[fade_0.3s_ease-in-out]`}>
    <div className="overflow-x-auto relative mt-5 mx-auto border-2 rounded-lg max-w-[1100px]">
        {packageList.length > 0 &&
          <Table data={packageList} rowsPerPage={10} searchText={searchText} apiGetPackage={apiGetPackage} />
        }
      </div>
    </div>)
}
