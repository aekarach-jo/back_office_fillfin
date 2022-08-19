import React, { useEffect, useState } from "react";
import useTable from "../../../hooks/useTable";
import moment from "moment";
import TableFooter from "../../sub_component/TableFooter";
import { Link } from "react-router-dom";
import st from "../../../styles/allUse/table.module.scss";

const Table = ({ data, rowsPerPage, searchText }) => {
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState(data);
  const { slice, range } = useTable(data, page, rowsPerPage);

  useEffect(() => {
    console.log(filterData);
  }, []);

  function FormatDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  return (
    <>
      <table className={st.contentTable}>
        <thead>
          <tr>
            <th scope="col"> ID </th>
            <th scope="col"> ชื่อผู้ใช้ (username) </th>
            <th scope="col"> เพศ </th>
            <th scope="col"> วันที่สมัครสมาชิก </th>
            <th scope="col">เพิ่มเติม </th>
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
                // setMemberList(text)
                return text;
              }
            })
            .map((data, index) => (
              <tr key={index}>
                <td>{data.id} </td>
                <td>{data.username}</td>
                <td>{data.gender}</td>
                <td>
                  <FormatDate dateTime={data.createdAt} />
                </td>
                <td>
                  <div className={st.wrapBtn}>
                    <Link
                      to={`/account/detail?member_code=${data.member_code}`}
                    >
                      <button type="button"> แก้ไข</button>
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
