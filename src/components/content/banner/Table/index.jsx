import React, { useState } from "react";
import useTable from "../../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../../sub_component/TableFooter";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import st from "../../../../styles/allUse/table.module.scss";
import 'moment/locale/th'
console.log(moment().locale('en').format('LLLL'))
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: true,
});

const Table = ({ data, rowsPerPage, apiGetContent }) => {
  const apiUrl = useSelector((state) => state.app.apiPath);
  const access_token = useSelector((state) => state.app.access_token);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  function handleChangeStatus(bannerId, status) {
    console.log(bannerId);
    console.log(status);
    if (status) {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "ยืนยันการเปลี่ยนสถานะ",
        text: "การปิดสถานะ จะส่งผลต่อการมองเห็นของลูกค้า",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#C93A87",
        backdrop: false,
      }).then((res) => {
        if (res.isConfirmed) {
          status = false;
          apiChangeStatus(bannerId, status);
        } else {
          Toast.fire({
            icon: "warning",
            title: "ยกเลิกแล้ว",
          });
        }
      });
    } else if (!status) {
      status = true;
      apiChangeStatus(bannerId, status);
    }
  }

  async function apiChangeStatus(bannerId, status) {
    console.log(handleChangeStatus);
    try {
      await axios({
        method: "POST",
        url: `${apiUrl}/api/admin/changeDisplayBanner`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          id: bannerId,
          display: status,
        },
      }).then((res) => {
        Toast.fire({
          icon: "success",
          title: "แก้ไขแล้ว",
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function FormatDate({ dateTime }) {
    console.log(dateTime)
    dateTime = moment(dateTime).format("LL");
    console.log(dateTime)
    return <span>{dateTime}</span>;
  }

  return (
    <>
      <table className={st.contentTable}>
        <thead>
          <tr>
            <th scope="col"> ลำดับ </th>
            <th scope="col"> เพศ </th>
            <th scope="col"> ตำแหน่ง </th>
            <th scope="col"> อัปเดทเมื่อ </th>
            <th scope="col"> สถานะ</th>
            <th scope="col"> เพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          {slice?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.isMen && 'ชาย'}
                {!data.isMen && 'หญิง'}
              </td>
              <td>
                {data.position == 'all-store' && 'หน้าสินค้า'}
                {data.position == 'store' && 'หน้าร้านค้า'}
              </td>
              <td>
                <FormatDate dateTime={data.updatedAt} />
              </td>
              <td>
                <label className="inline-flex mx-auto relative justify-center items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={data.display ? true : false}
                    onClick={() => handleChangeStatus(data.id, data.display)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                </label>
              </td>
              <td>
                <div className="flex flex-row justify-center gap-2">
                  <Link to={`/content/detail?type=${data.type}`}>
                    <button
                      type="button"
                      className="flex flex-row gap-2 text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      <i className="my-auto fa-solid fa-pen-to-square"></i>
                      <p>แก้ไข</p>
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
