import React, { Fragment, useState } from "react";
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

const Table = ({ data, rowsPerPage, apiGetAdmin }) => {
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
        apiGetAdmin();
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
            <th scope="col"> ชื่อผู้ใช้ </th>
            <th scope="col"> อีเมล </th>
            <th scope="col"> วันที่สมัคร </th>
            <th scope="col"> สิทธิ์ </th>
            <th scope="col"> สถานะ</th>
            <th scope="col"> เพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          {slice?.map((data, index) => (
            <Fragment key={index}>
              <tr>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>
                  <FormatDate dateTime={data.createdAt} />
                </td>
                <td>{data.permission}</td>
                <td>
                  <p
                    className={`
                                ${
                                  data.status === "pending" &&
                                  "text-yellow-500 text-center"
                                }
                                ${
                                  data.status === "active" &&
                                  "text-green-600 text-center"
                                }
                                ${
                                  data.status === "inactive" &&
                                  "text-orange-600 text-center"
                                }
                                ${
                                  data.status === "banned" &&
                                  "text-red-600 text-center"
                                }
                                text-md font-semibold`}
                  >
                    {data.status}
                  </p>
                </td>
                <td>
                  <div className="flex flex-row justify-center gap-2">
                    <Link to={`/admin/detail?code=${data.adminCode}`}>
                      <button
                        type="button"
                        className={`bg-yellow-400 text-white hover:bg-yellow-600 duration-100
                         focus:outline-none focus:ring-4 
                         font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2  `}
                      >
                        ตั้งค่า
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
