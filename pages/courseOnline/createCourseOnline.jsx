import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import { Image } from "react-bootstrap";
import { uploadAPI } from "../api/upload/upload";
import { useRouter } from "next/router";

const CreateCourseOnline = () => {
  const Router = useRouter();
  const [selectPlace, setSelectPlace] = useState([]);
  const initCourseOnline = {
    place: "",
    tenkhoahoc: "",
    noidung: "",
    thongtinthem: "",
    gia: "",
    soluong: "",
  };
  const [courseOnlineData, setCourseOnlineData] = useState(initCourseOnline);
  const { place, tenkhoahoc, noidung, thongtinthem, gia, soluong } =
    courseOnlineData;
  const [image, setImage] = useState("");
  const [inputImage, setInputImage] = useState("");

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res)
        setSelectPlace(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeCourseOnline = (e) => {
    const { name, value } = e.target;
    setCourseOnlineData({ ...courseOnlineData, [name]: value });
  };

  const handleChangeCourseImage = (e) => {
    setInputImage(e.target.files[0]);
  };

  useEffect(() => {
    uploadAPI
      .uploadAvatarAPI(inputImage)
      .then((res) => {
        setImage(res.data.link);
      })
      .catch((err) => console.log(err));
  }, [inputImage]);

  const handleCreateCourseOnline = (e) => {
    e.preventDefault();
    const body = {
      place: place,
      tenkhoahoc: tenkhoahoc,
      noidung: noidung,
      thongtinthem: thongtinthem,
      soluong: soluong,
      gia: gia,
      image: image,
    };

    placeAPI
      .courseOnline(body)
      .then((res) => {
        // console.log(res)
        Router.push("/courseOnline/getAllCourseOnline");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Tạo Khóa Học Online</h1>

        <div className="profile-gird-name">
          <div className="pt-select">
            <select
              name="place"
              className="pt-select-place"
              onChange={handleChangeCourseOnline}
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
            onChange={handleChangeCourseOnline}
          />

          <label htmlFor="name" className="profile-textlabel">
            Nội dung
          </label>
          <br />
          <textarea
            id="name"
            className="profile-input"
            name="noidung"
            onChange={handleChangeCourseOnline}
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
            onChange={handleChangeCourseOnline}
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
            onChange={handleChangeCourseOnline}
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
            onChange={handleChangeCourseOnline}
          />
        </div>
        <div className="button-container">
          <button className="profile-button" onClick={handleCreateCourseOnline}>
            Tạo thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseOnline;
