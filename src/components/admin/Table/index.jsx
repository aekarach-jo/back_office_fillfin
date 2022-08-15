import React, { Fragment, useState } from "react";
import useTable from "../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../sub_component/TableFooter";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              email
            </th>
            <th scope="col" className="py-3 px-6">
              createdAt
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              permission
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              status
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              option
            </th>
          </tr>
        </thead>
        <tbody>
          {slice?.map((data, index) => (
            <Fragment key={index}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-2 px-6">{data.username}</td>
                <td className="py-2 px-6">{data.email}</td>
                <td className="py-2 px-6">
                  <FormatDate dateTime={data.createdAt} />
                </td>
                <td className="py-2 px-6 ">
                  <p className=
                    {` text-md font-semibold
                      ${data.statusConfirm === "confirm" && "text-green-600 text-center" }
                      ${data.statusConfirm === "pending" && "text-yellow-500 text-center"}
                    `}
                  >
                    {data.statusConfirm}
                  </p>
                </td>
                <td className="py-2 px-6 text-center">{data.permission}</td>
                <td className="py-2 px-6">
                  <div className="flex flex-row justify-center gap-2">
                    <Link to={`/admin/detail?code=${data.adminCode}`}>
                      <button
                        type="button"
                        className={`
                        ${data.statusConfirm === 'pending' && 'text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300 dark:focus:ring-yellow-900'}
                        ${data.statusConfirm === 'confirm' && 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:focus:ring-green-900'}
                        
                         focus:outline-none focus:ring-4 
                         font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2  `}
                      >
                        จัดการ
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