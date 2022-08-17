import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../sub_component/TableFooter";
import st from "../../../styles/allUse/table.module.scss";
const Table = ({ data, rowsPerPage, searchText }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  function FormatDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  return (
    <>
      <table className={st.contentTable}>
        <thead>
          <tr>
            <th scope="col"> เลขที่ออเดอร์</th>
            <th scope="col"> ชื่อผู้สั่ง </th>
            <th scope="col"> วันที่ซื้อ </th>
            <th scope="col"> สถานะการชำระเงิน </th>
            <th scope="col"> สถานะสินค้า </th>
            <th scope="col"> เพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          {slice
            ?.filter((text) => {
              if (searchText === "") {
                return text;
              } else if (
                text.orderNumber
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return text;
              }
            })
            .map((data, index) => (
              <tr key={index}>
                <td> {data.orderNumber} </td>
                <td>{data.name}</td>
                <td>
                  <FormatDate dateTime={data.createdAt} />
                </td>
                <td>
                  <p
                    className={`
                    ${data.paymentStatus == "pending" && "text-yellow-500"}
                    ${data.paymentStatus == "confirm" && "text-green-600"}
                    ${data.paymentStatus == "failed" && "text-red-500"}
                       text-md font-semibold`}
                  >
                    {data.paymentStatus}
                  </p>
                </td>
                <td>
                  <p
                    className={`
                    ${data.status === "pending" && "text-yellow-500"}
                    ${data.status === "shipping" && "text-orange-500"}
                    ${data.status === "success" && "text-green-600"}
                    ${data.status === "failed" && "text-red-500"}
                       text-md font-semibold`}
                  >
                    {data.status}
                  </p>
                </td>
                <td>
                  <div className={st.wrapBtn}>
                    <Link to={`/order/detail?orderNumber=${data.orderNumber}`}>
                      <p
                        type="button"
                        className="m-auto gap-2 flex text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-yellow-900"
                      >
                        <i className="fa-solid fa-eye my-auto"></i>
                        ดูสินค้า
                      </p>
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
