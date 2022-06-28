import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import { Button, Image } from "react-bootstrap";

const GetAllCourseOnline = () => {
  const [courseOnline, setCourseOnline] = useState([]);

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res)
        setCourseOnline(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các Khóa học Online</h2>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Nội dung</th>
              <th>Thông tin thêm</th>
              <th>Ảnh đại diện</th>
              <th>Số lượng</th>
              <th>Địa chỉ</th>
            </tr>
          </thead>
          <tbody id="table">
            {courseOnline.map((course) => (
              <>
                {course.onlineList.map((courselist) => (
                  <tr key={courselist.id}>
                    <td>{courselist.tenkhoahoc}</td>
                    <td style={{whiteSpace: "pre-wrap"}}>{courselist.noidung}</td>
                    <td style={{whiteSpace: "pre-wrap"}}>{courselist.thongtinthem}</td>
                    <td>
                      <Image
                        src={courselist.image}
                        className="admin-img"
                      ></Image>
                    </td>
                    <td>{courselist.soluong}</td>
                    <td>{course.diachi}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllCourseOnline;
