import { Router, useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { sportAPI } from "../api/sport/sport";
import { uploadAPI } from "../api/upload/upload";

const CreateServiceSport = () => {
  const Router = useRouter();
  const [selectSport, setSelectSport] = useState([]);
  const [idSport, setIdSport] = useState("");
  const initSport = { name: "", noidung: "", thongtinthem: "", gia: "" };
  const [sportData, setSportData] = useState(initSport);
  const { name, noidung, thongtinthem, gia } = sportData;
  const [inputFile, setInputFile] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    sportAPI
      .getSport()
      .then((res) => {
        // console.log(res);
        setSelectSport(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeSportPlace = (e) => {
    // console.log(e.target.value)
    setIdSport(e.target.value);
  };

  const handleChangeSport = (e) => {
    const { name, value } = e.target;
    setSportData({ ...sportData, [name]: value });
  };

  const handleChangeImage = (e) => {
    setInputFile(e.target.files[0]);
  };

  useEffect(() => {
    uploadAPI
      .uploadAvatarAPI(inputFile)
      .then((res) => {
        // console.log(res)
        setImage(res.data.link);
        // console.log(res.data.link)
      })
      .catch((err) => console.log(err));
  }, [inputFile]);

  const handleCreateServicepSport = (e) => {
    const body = {
      tendichvu: name,
      noidung: noidung,
      thongtinthem: thongtinthem,
      image: image,
      gia: gia,
      sport: idSport,
    };
    sportAPI
      .createSportPlace(body)
      .then((res) => {
        // console.log(res);
        Router.push("/serviceSport/getAllServiceSport");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-service">
      <div className="create-spa">
        <div className="profiles">
          <div className="container">
            <h1 className="title">Thêm dịch vụ cho cơ sở</h1>
            <br />
            <label htmlFor="name" className="profile-textlabel">
              Chọn cơ sở thể thao giải trí
            </label>
            <br />

            <div className="pt-select">
              <select
                name="place"
                className="pt-select-place"
                onChange={handleChangeSportPlace}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {selectSport.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="profile-gird-name">
              <label htmlFor="name" className="profile-textlabel">
                Tên dịch vụ
              </label>
              <br />
              <input
                id="name"
                type="text"
                className="profile-input"
                name="name"
                onChange={handleChangeSport}
              />

              <label htmlFor="name" className="profile-textlabel">
                Nội dung
              </label>
              <br />
              <textarea
                id="name"
                className="profile-input"
                name="noidung"
                onChange={handleChangeSport}
              ></textarea>

              <label htmlFor="name" className="profile-textlabel">
                Image
              </label>
              <br />
              <input
                id="name"
                type="file"
                className="profile-input"
                name="image"
                onChange={handleChangeImage}
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
                onChange={handleChangeSport}
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
                onChange={handleChangeSport}
              />
            </div>
            <div className="button-container">
              <button
                className="profile-button"
                onClick={handleCreateServicepSport}
              >
                Tạo thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceSport;
