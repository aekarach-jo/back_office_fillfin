import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import st from '../../styles/allUse/content.module.scss'
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Setting() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))
    const [dataSetting ,setDataSetting] =useState()
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'green',
        },
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


    
    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>ตั้งค่า </p>
            <div className={st.contentTable}>
                <form>
                    <label className="block">
                        <CssTextField label="Custom CSS" id="custom-css-outlined-input" />
                    </label>
                </form>



            </div>
        </div>
    )
}

export default Setting