import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import st from '../../styles/allUse/content.module.scss'
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

function Setting() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [dataSetting, setDataSetting] = useState()
    const [valueChat, setValueChat] = useState("")
    const [valueSlip, setValueSlip] = useState("")
    const [valueGp, setValueGp] = useState("")
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
        },
        color: 'green',
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        }
    });

    useEffect(() => {
        apiGetSetting()
    }, [])


    async function apiGetSetting() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/getSetting`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            console.log(res.data.setting);
            if (res.data.status) {
                setDataSetting(res.data.setting)
            }
        })
    }

    function handlesubmitForm(setting) {
        let names = ""
        if (setting === 'gross_profit') {
            names = 'GP'
        } else if (setting == 'cron_job_month') {
            names = 'การลบสลิป'
        } else if (setting == 'time_delete_message') {
            names = 'การลบแชท'
        }
        console.log(setting);
        Swal.fire({
            title: 'ยืนยันการตั้งค่า ' + names,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#f472b6",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                apiUpdateSetting(setting)
            }
        })
    }


    async function apiUpdateSetting(setting) {
        let values = ""
        { setting == 'gross_profit' ? values = valueGp : values = valueSlip }

        await axios({
            method: 'POST',
            url: `${apiUrl}/api/admin/updateSetting`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: {
                settingName: setting,
                settingValue: values
            }
        }).then(() => {
            console.log('success');
            apiGetSetting()
        })
    }



    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>ตั้งค่า </p>
            <div className={st.contentTable}>
                {dataSetting?.map((data, index) => (
                    <form key={index} className='flex flex-row p-4 items-center justify-start gap-6'>
                        <div className='flex flex-col items-center justify-start gap-12'>
                            {data.settingName == "gross_profit" && <label>ตั้งค่า Gross profit</label>}
                            {data.settingName == "cron_job_month" && <label>ตั้งค่าลบสลิป</label>}
                            {data.settingName == "time_delete_message" && <label>ตั้งค่าลบแชท</label>}
                        </div>
                        <div className='flex flex-col items-center justify-start gap-5'>
                            {data.settingName == "gross_profit" && <CssTextField label={`${data.settingValue} %GP`} id="custom-css-outlined-input" value={valueGp} onChange={(e) => setValueGp(e.target.value.trim(""))} />}
                            {data.settingName == "cron_job_month" && <CssTextField label={`${data.settingValue} เดือน`} id="custom-css-outlined-input" value={valueSlip} onChange={(e) => setValueSlip(e.target.value.trim(""))} />}
                            {data.settingName == "time_delete_message" && <CssTextField label={`${data.settingValue} วัน`} id="custom-css-outlined-input" value={valueChat} onChange={(e) => setValueChat(e.target.value.trim(""))} />}
                        </div>
                        <div className='flex flex-col items-center justify-start gap-12'>
                            <button type='button' className='bg-green-600 text-white text-md rounded w-[4rem] h-[2rem]' onClick={() => handlesubmitForm(data.settingName)}>แก้ไข</button>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    )
}

export default Setting