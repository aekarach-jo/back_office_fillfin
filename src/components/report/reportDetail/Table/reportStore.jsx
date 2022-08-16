import React, { useState } from "react";
import moment from "moment";
import TableFooter from "../../../sub_component/TableFooter";
import useTable from "../../../../hooks/useTable";
import { Link } from "react-router-dom";

const ReportStore = ({ data, rowsPerPage, searchText }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  function FormatDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 text-center">
              เพศ
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              วันที่
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ชื่อร้าน
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ชื่อผู้ใช้
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ระดับ order
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              รายการสินค้า
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              จำนวน
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ราคา
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              หมายเหตุ
            </th>
          </tr>
        </thead>
        <tbody>
          {slice
            ?.filter((text) => {
              if (searchText === "") {
                return text;
              } else if (
                text.shopName.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return text;
              }
            })
            .map((data, index) => (
              <tr
                key={index}
                className=" text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.gender}
                </th>
                <td className="py-2 px-6 text-center">
                  {data.date && <FormatDate dateTime={data.date} />}
                </td>
                <td className="py-2 px-6 text-center">{data.shopName}</td>
                <td className="py-2 px-6 text-center">{data.cusUser}</td>
                <td className="py-2 px-6 text-center">{data.orderLevel}</td>
                <td className="py-2 px-6 text-center">{data.orderItem}</td>
                <td className="py-2 px-6 text-center">{data.amount}</td>
                <td className="py-2 px-6 text-center">{data.price}</td>
                <td className="py-2 px-6 text-center">{data.note}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default ReportStore;
