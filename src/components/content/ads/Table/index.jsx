import React, { useState } from "react";
import useTable from "../../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../../sub_component/TableFooter";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import st from "../../../../styles/allUse/table.module.scss";
import Modal_edit from "../modal_edit";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: true,
});

const Table = ({ adsList, position, rowsPerPage, apiGetContent }) => {
  const apiUrl = useSelector((state) => state.app.apiPath);
  const access_token = useSelector((state) => state.app.access_token);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(adsList, page, rowsPerPage);
  const [isOpen, setIsOpen] = useState(false)
  const [adsData, setAdsData] = useState()

  function FormatDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  function onSetOpen() {
    setIsOpen(!isOpen)
  }

  function handleShowImage(image) {
    Swal.fire({
      imageUrl: apiUrl + image,
      imageWidth: 800,
      imageHeight: 300,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      backdrop: true,
      background: 'rgba(0,0,0,0)'
    })
  }

  return (
    <>
      <table className={st.contentTable}>
        <thead>
          <tr>
            <th scope="col"> ลำดับ </th>
            <th scope="col"> รูปขนาดย่อ </th>
            <th scope="col"> ตำแหน่ง </th>
            <th scope="col"> อัปเดทเมื่อ </th>
            <th scope="col"> เพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          {slice?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="flex justify-center">
                <img onClick={() => handleShowImage(data.img_path)} width={35} height={35} src={`${apiUrl}${data.img_path}`} alt="" />
              </td>
              <td>{data.position}</td>
              <td>
                <FormatDate dateTime={data.updatedAt} />
              </td>
              <td>
                <div className="flex flex-row justify-center gap-2">
                  <button
                    onClick={() => (setIsOpen(!isOpen), setAdsData(data))}
                    type="button"
                    className="flex flex-row gap-2 text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    <i className="my-auto fa-solid fa-pen-to-square"></i>
                    <p>แก้ไข</p>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen &&
        <Modal_edit data={adsData} position={position} onSetOpen={onSetOpen} apiGetContent={apiGetContent} />
      }
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
