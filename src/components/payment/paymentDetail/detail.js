import React from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import st from './detailPay.module.scss'

export default function Detail({ paymentDetail }) {
    const apiUrl = useSelector((state) => (state.app.apiPath))

    function showImage(slip) {
        Swal.fire({
            imageUrl: apiUrl+slip,
            imageWidth: 400,
            imageHeight: 500,
            imageAlt: 'Custom image',
            showConfirmButton : false,
            backdrop : true,
            background : 'rgba(0,0,0,0)'
        })
    }

    return (
        <>
            <div className={st.detail_pay}>
                <div className={st.column_detail_pay} >
                    <div className={st.text_top}>
                        <p>รายละเอียดการชำระค่าสมาชิก</p>
                    </div>
                    <div className={st.column_table}>
                        <table>
                            <tbody>
                                <tr>
                                    <th className='rounded-tl-md'>รายละเอียดแพ็กเกจ</th>
                                    <th className='rounded-tr-md' />
                                </tr>
                                <tr>
                                    <td>แพ็กเกจ {paymentDetail.name}</td>
                                    <td className={st.td_right} style={{ textAlign: 'center' }}>{paymentDetail.price} BTH</td>
                                </tr>
                                <tr>
                                    <td>
                                        ระยะเวลาสมาชิกแพ็กเกจ {paymentDetail.packageName}
                                        ({paymentDetail.day} วัน)
                                    </td>
                                    <td />
                                </tr>
                                <tr>
                                    <td>รวมทั้งหมด</td>
                                    <td style={{ textAlign: 'center' }}>{paymentDetail.price} BTH</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={st.column_detail_member}>
                            <div >
                                <p>ข้อมูลการชำระเงิน</p>
                                <div className={st.text_column}>
                                    {paymentDetail.slip != null &&
                                        <img src={`${apiUrl}${paymentDetail.slip}`} alt="slip" onClick={() => showImage(paymentDetail.slip)}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
