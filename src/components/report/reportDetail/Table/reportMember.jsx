import React, { useState } from "react";
import moment from "moment";
import TableFooter from "../../../sub_component/TableFooter";
import useTable from "../../../../hooks/useTable";
import { Link } from "react-router-dom";

const ReportMember = ({ data, rowsPerPage, searchText }) => {
  console.log(data);
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
              วันต่ออายุ Package ล่าสุุด
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ระดับ Package
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ชื่อผู้ใช้งาน
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ยอดซื้อสะสม
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              ยอด Package สะสม
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              วันที่สมัครสมาชิก
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
                text.cusUser.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return text;
              }
            })
            .map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-2 px-6 text-center">
                  <FormatDate dateTime={data.dateRenewal} />
                </td>
                <td className="py-2 px-6 text-center">{data.packageLevel}</td>
                <td className="py-2 px-6 text-center">{data.cusUser}</td>
                <td className="py-2 px-6 text-center">{data.totalPrice}</td>
                <td className="py-2 px-6 text-center">{data.totalPackage}</td>
                <td className="py-2 px-6 text-center">
                  <FormatDate dateTime={data.dataRegister} />
                </td>
                <td className="py-2 px-6 text-center">{data.note}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default ReportMember;
