import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { courseAPI } from "../api/course/course";
import { placeAPI } from "../api/place/place";
import { uploadAPI } from "../api/upload/upload";
import { useRouter } from "next/router";

const CreateCourse = () => {
  const initCourse = {
    tenkhoahoc: "",
    noidung: "",
    thongtinthem: "",
    soluong: "",
    gia: "",
  };
  const [adminCourse, setAdminCourse] = useState(initCourse);
  const { tenkhoahoc, noidung, thongtinthem, soluong, gia } = adminCourse;
  const [inputFile, setInputFile] = useState("");
  const [image, setImage] = useState("");
  const [selectPlace, setSelectPlace] = useState([]);
  const [idPlace, setIdPlace] = useState("");
  const Router = useRouter();

  const handleChangeCourse = (e) => {
    const { name, value } = e.target;
    setAdminCourse({ ...adminCourse, [name]: value });
  };

  const handleChangeCourseImage = (e) => {
    setInputFile(e.target.files[0]);
  };

  useEffect(() => {
    uploadAPI
      .uploadAvatarAPI(inputFile)
      .then((res) => {
        setImage(res.data.link);
      })
      .catch((err) => console.log(err));
  }, [inputFile]);

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res.data);
        setSelectPlace(res.data);
      })
      .catch((err) => console.log(err));
  });

  const handleChangePlace = (e) => {
    // console.log(e.target.value);
    setIdPlace(e.target.value);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const body = {
      tenkhoahoc: tenkhoahoc,
      noidung: noidung,
      thongtinthem: thongtinthem,
      soluong: soluong,
      image: image,
      place: idPlace,
      gia: gia,
    };

    courseAPI
      .createCourse(body)
      .then((res) => {
        // console.log(res);
        Router.replace("/course/allCourse");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Tạo Khóa Học Mới</h1>

        <div className="profile-gird-name">
          <div className="pt-select">
            <select
              name="place"
              className="pt-select-place"
              onChange={handleChangePlace}
            >
              <option selected disabled>
                Choose an option
              </option>
              {selectPlace.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.diachi}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="name" className="profile-textlabel">
            Tên khóa học
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="tenkhoahoc"
            onChange={handleChangeCourse}
          />

          <label htmlFor="name" className="profile-textlabel">
            Nội dung
          </label>
          <br />
          <textarea
            id="name"
            className="profile-input"
            name="noidung"
            onChange={handleChangeCourse}
          ></textarea>

          <label htmlFor="name" className="profile-textlabel">
            Giá
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="gia"
            onChange={handleChangeCourse}
          />

          <label htmlFor="name" className="profile-textlabel">
            Ảnh
          </label>
          <br />
          <input
            id="name"
            type="file"
            className="profile-input"
            onChange={handleChangeCourseImage}
          />
          <Image style={{width:"50%"}} src={image} alt="loading..."></Image>
          <br />

          <label htmlFor="name" className="profile-textlabel">
            Thông tin thêm
          </label>
          <br />
          <textarea
            id="name"
            className="profile-input"
            name="thongtinthem"
            onChange={handleChangeCourse}
          ></textarea>

          <label htmlFor="name" className="profile-textlabel">
            Số lượng
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="soluong"
            onChange={handleChangeCourse}
          />
        </div>
        <div className="button-container">
          <button className="profile-button" onClick={handleCreateCourse}>
            Tạo thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
