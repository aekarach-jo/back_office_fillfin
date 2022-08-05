import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../sub_conponent/TableFooter";

const Table = ({ data, rowsPerPage, searchText }) => {
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
            <th scope="col" className="py-3 px-6">
              Order Number
            </th>
            <th scope="col" className="py-3 px-6">
              name
            </th>
            <th scope="col" className="py-3 px-6">
              createdAt
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              payment Status
            </th>
            <th scope="col" className="py-3 px-6 text-center">
              option
            </th>
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
                <td className="py-2 px-6">{data.name}</td>
                <td className="py-2 px-6">
                  <FormatDate dateTime={data.createdAt} />
                </td>
                <td className="py-2 px-6 text-center">
                  <p
                    className={`
                                     ${
                                       data.paymentStatus === "confirm" &&
                                       "text-green-600"
                                     }
                                     ${
                                       data.paymentStatus === "pending" &&
                                       "text-yellow-500"
                                     }
                                     text-md font-semibold`}
                  >
                    {data.paymentStatus}
                  </p>
                </td>
                <td className="py-2 px-6">
                  <div className="flex flex-row justify-center">
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
