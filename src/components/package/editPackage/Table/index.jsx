import React, { useEffect, useRef, useState } from "react";
import useTable from "../../../../hooks/useTable";
import moment from "moment";
import st from "../../../../styles/allUse/table.module.scss";
import TableFooter from "../../../sub_component/TableFooter";
import { useSelector } from "react-redux";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: true,
});

const Table = ({ data, rowsPerPage, searchText, apiGetPackage }) => {
  const apiUrl = useSelector((state) => state.app.apiPath);
  const access_token = useSelector((state) => state.app.access_token);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const [select, setSelect] = useState({});
  const [open, setOpen] = useState(false);
  const [packageEdit, setPackageEdit] = useState({});
  const [imageObj, setImageobj] = useState();
  const inputProfileImage = useRef([]);

  useEffect(() => {}, [select]);

  function FormatDate({ dateTime }) {
    dateTime = moment(dateTime).format("DD MMM YYYY");
    return <span>{dateTime}</span>;
  }

  function handleSelect(data) {
    setSelect(data);
    setPackageEdit({
      packageId: data.package_id,
      content: data.content,
      day: data.day,
      grossProfit: data.grossProfit,
      price: data.price,
      name: data.name,
    });
  }

  function handleEdit() {
    console.log(packageEdit);
    console.log(inputProfileImage.current.files[0]);
    const formData = new FormData();
    if (inputProfileImage.current.files.length > 0) {
      formData.append("image", inputProfileImage.current.files[0]);
    }
    formData.append("content", packageEdit.content);
    formData.append("day", packageEdit.day);
    formData.append("grossProfit", packageEdit.grossProfit);
    formData.append("price", packageEdit.price);
    formData.append("packageId", packageEdit.packageId);
    console.log(`${apiUrl}/api/admin/package/update`);
    apiEditPackage(formData);
  }

  async function apiEditPackage(formData) {
    console.log(1);
    try {
      await axios({
        method: "POST",
        url: `${apiUrl}/api/admin/package/update`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: formData,
      }).then((res) => {
        Toast.fire({
          icon: "success",
          title: "แก้ไขแล้ว",
        });
        apiGetPackage();
        setPackageEdit({
          packageId: "",
          content: "",
          day: "",
          grossProfit: "",
          price: "",
          name: "",
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function inputImageOnChange(e) {
    if (!e.target.files.length) {
      return false;
    }
    if (
      ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(
        e.target.files[0].type
      )
    ) {
      const URLs = URL.createObjectURL(e.target.files[0]);
      setImageobj(URLs);
    } else {
      Swal.fire({
        title: "กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ",
        icon: "warning",
        position: "center",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  }

  return (
    <>
      {packageEdit != {} && (
        <Collapse in={open} timeout="auto" >
          <List
            component="div"
            disablePadding
            className="flex flex-wrap flex-row items-center justify-center gap-4 min-h-[20rem] border-2 rounded-lg border-pink-700 p-10 relative bg-pink-200/20 "
          >
            <i
              onClick={() => setOpen(!open)}
              className="absolute right-4 top-4 text-xl font-bold bg-red-500 text-white w-7 h-7 p-1 cursor-pointer  fa-solid fa-xmark hover:bg-red-700"
            ></i>
            <div className="flex">
              {imageObj ? (
                <img
                  src={imageObj}
                  className="mx-auto mb-3 w-44 h-44 rounded-full shadow-lg"
                  alt="image-first"
                  onClick={() => inputProfileImage.current.click()}
                />
              ) : (
                <img
                  src={`${apiUrl}${select.image}`}
                  alt="image"
                  className="mx-auto mb-3 w-44 h-44 rounded-full shadow-lg"
                  onClick={() => inputProfileImage.current.click()}
                />
              )}
              <input
                type="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png,.webp"
                ref={inputProfileImage}
                onChange={(e) => inputImageOnChange(e)}
              />
            </div>
            <div className="flex">
              <div className="w-full my-auto">
                <div className="flex flex-row mb-2 ">
                  <div className="w-2/5">
                    <label className="block text-left text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      ชื่อแพ็คเก็จ
                    </label>
                  </div>
                  <div className="w-3/5">
                    <input
                      className="bg-gray-300  border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight "
                      type="text"
                      readOnly
                      defaultValue={packageEdit.name}
                      onChange={(e) =>
                        setPackageEdit({
                          ...packageEdit,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex mb-2 ">
                  <div className="w-2/5">
                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      จำนวนวันแพ็คเก็จ
                    </label>
                  </div>
                  <div className="w-3/5">
                    <input
                      className="bg-white appearance-none border-2 border-gray-200 
                                                        rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                                                        focus:bg-white focus:border-pink-500"
                      type="text"
                      defaultValue={packageEdit.day}
                      onChange={(e) =>
                        setPackageEdit({
                          ...packageEdit,
                          day: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex  mb-2">
                  <div className="w-2/5">
                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Gross Profit
                    </label>
                  </div>
                  <div className="w-3/5 relative">
                    <input
                      className="bg-white appearance-none border-2 border-gray-200 rounded w-[80%] py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:bg-white focus:border-pink-500"
                      type="text"
                      defaultValue={packageEdit.grossProfit}
                      onChange={(e) =>
                        setPackageEdit({
                          ...packageEdit,
                          grossProfit: e.target.value,
                        })
                      }
                    />
                    <i className="absolute right-9 top-3 text-gray-500 fa-solid fa-percent"></i>
                  </div>
                </div>
                <div className="flex mb-2 ">
                  <div className="w-2/5">
                    <label className="block text-left  text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      บทความ
                    </label>
                  </div>
                  <div className="w-3/5">
                    <textarea
                      className="bg-white appearance-none border-2 border-gray-200 
                      rounded p-2 w-[80%] h-24 text-gray-700 leading-tight focus:outline-none 
                     focus:bg-white focus:border-pink-500"
                      type="text"
                      defaultValue={packageEdit.content}
                      onChange={(e) =>
                        setPackageEdit({
                          ...packageEdit,
                          content: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="m-auto gap-2 flex text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-pink-900"
                  onClick={() => (handleEdit(), setOpen(!open))}
                >
                  <i className="my-auto fa-solid fa-pen-to-square"></i>
                  แก้ไข
                </button>
              </div>
            </div>
            {/* <ListItem button>
            <ListItemIcon>1</ListItemIcon>
            <ListItemText primary="Whatever" />
          </ListItem> */}
          </List>
        </Collapse>
      )}
      <table className={st.contentTable}>
        <thead>
          <tr>
            <th scope="col"> รูป </th>
            <th scope="col"> แพ็คเก็จ</th>
            <th scope="col"> เพศ </th>
            <th scope="col"> จำนวนวันของแพ็คเก็จ </th>
            <th scope="col"> %GP</th>
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
              <tr
                key={index}
                className={`${select == index && "bg-pink-400/30"}`}
              >
                <td>
                  <img
                    className="mx-auto "
                    width={30}
                    height={30}
                    src={`${apiUrl}${data.image}`}
                    alt="imagePackage"
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.day}</td>
                <td>{data.grossProfit}</td>
                <td>
                  <div className={st.wrapBtn}>
                    {/* <Link to={`/order/detail?orderNumber=${data.orderNumber}`}> */}
                    <button
                      type="button"
                      onClick={() => (setOpen(true), handleSelect(data))}
                      className="m-auto gap-2 flex text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-1.5 text-center dark:focus:ring-yellow-900"
                    >
                      <i className="my-auto fa-solid fa-pen-to-square"></i>
                      แก้ไข
                    </button>

                    {/* </Link> */}
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
