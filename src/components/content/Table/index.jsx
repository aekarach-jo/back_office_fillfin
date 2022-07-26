import React, { useState } from "react";
import useTable from "../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../sub_component/TableFooter";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import st from "../../../styles/allUse/table.module.scss";
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

  function handleChangeStatus(contentId, status) {
    if (status === "yes") {
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
          status = "no";
          apiChangeStatus(contentId, status);
        } else {
          Toast.fire({
            icon: "warning",
            title: "ยกเลิกแล้ว",
          });
        }
      });
    } else if (status === "no") {
      status = "yes";
      apiChangeStatus(contentId, status);
    }
  }

  async function apiChangeStatus(contentId, status) {
    try {
      await axios({
        method: "POST",
        url: `${apiUrl}/api/admin/changeStatusContent`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          id: contentId,
          display: status,
        },
      }).then((res) => {
        apiGetContent();
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
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  return (
    <>
      <table className={st.contentTable}>
        <thead>
          <tr>
            <th scope="col"> ลำดับ </th>
            <th scope="col"> ประเภท </th>
            <th scope="col"> อัปเดทเมื่อ </th>
            <th scope="col"> สถานะ</th>
            <th scope="col"> เพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          {slice?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.type}</td>
              <td>
                <FormatDate dateTime={data.updatedAt}/>
              </td>
              <td>
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={data.display === "yes" ? true : false}
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
                      className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      แก้ไข
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
