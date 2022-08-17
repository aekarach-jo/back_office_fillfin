import React, { useState } from "react";
import moment from "moment";
import TableFooter from "../../../sub_component/TableFooter";
import useTable from "../../../../hooks/useTable";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


const ReportOrsers = ({ data, rowsPerPage, searchText }) => {
  const apiUrl = useSelector((state) => (state.app.apiPath))
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  function FormatDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  function handleShowSlip(slip){
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
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Order NO.
            </th>
            <th scope="col" className="py-3 px-6">
              ชื่อ
            </th>
            <th scope="col" className="py-3 px-6">
              ที่อยู่
            </th>
            <th scope="col" className="py-3 px-6">
              เบอร์โทรศัพท์
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ราคาขาย
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ราคาหลังหัก %GP
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              สลิปขาย
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              สลิปชำระ
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ข้อความ
            </th>
          </tr>
        </thead>
        <tbody>
          {slice
            ?.filter((text) => {
              if (searchText === "") {
                return text;
              } else if (
                text.username.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return text;
              }
            })
            .map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.orderNumber}
                </th>
                <td className="py-2 px-6">{data.cusName}</td>
                <td className="py-2 px-6">{data.address}</td>
                <td className="py-2 px-6">{data.phone}</td>
                <td className="py-2 px-6">{data.netPrice}</td>
                <td className="py-2 px-6">{data.totalPrice}</td>
                <td className="py-2 px-6">{data.paymentStatus}</td>
                <td className="py-2 px-6">
                  <img className="cursor-pointer" src={`${apiUrl}${data.slip}`} alt="slip" onClick={() => handleShowSlip(data.slip)} />
                </td>
                {/* <td className="py-2 px-6">{data.note}</td> */}

              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default ReportOrsers;
