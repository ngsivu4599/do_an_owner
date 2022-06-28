import { ServerStyleSheets } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { serviceAPI } from "../api/service/service";
import { spaAPI } from "../api/spa/spa";
import { uploadAPI } from "../api/upload/upload";

const CreateService = () => {
  const Router = useRouter();
  const [selectSpa, setSelectSpa] = useState([]);
  const [idSpa, setIdSpa] = useState("");
  const initService = { name: "", noidung: "", thongtinthem: "", gia: "" };
  const [serviceData, setServiceData] = useState(initService);
  const { name, noidung, thongtinthem, gia } = serviceData;
  const [inputFile, setInputFile] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    spaAPI
      .getAllSpa()
      .then((res) => {
        // console.log(res)
        setSelectSpa(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeSpa = (e) => {
    // console.log(e.target.value);
    setIdSpa(e.target.value);
  };

  const handleChangeService = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
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

  const handleCreateService = (e) => {
    e.preventDefault();
    const body = {
      spa: idSpa,
      tendichvu: name,
      noidung: noidung,
      thongtinthem: thongtinthem,
      image: image,
      gia: gia,
    };
    serviceAPI
      .createService(body)
      .then((res) => {
        // console.log(res);
        Router.push("/serviceSpa/getAllService");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-service">
      <div className="create-spa">
        <div className="profiles">
          <div className="container">
            <h1 className="title">Thêm dịch vụ cho cơ sở</h1>
            <label htmlFor="name" className="profile-textlabel">
              Chọn cơ sở chăm sóc sức khỏe
            </label>
            <br />

            <div className="pt-select">
              <select
                name="place"
                className="pt-select-place"
                onChange={handleChangeSpa}
              >
                <option selected disabled>
                  Choose an option
                </option>
                {selectSpa.map((spa) => (
                  <option key={spa.id} value={spa.id}>
                    {spa.name}
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
                onChange={handleChangeService}
              />

              <label htmlFor="name" className="profile-textlabel">
                Nội dung
              </label>
              <br />
              <textarea
                id="name"
                className="profile-input"
                name="noidung"
                onChange={handleChangeService}
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
                onChange={handleChangeService}
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
                onChange={handleChangeService}
              />
            </div>
            <div className="button-container">
              <button className="profile-button" onClick={handleCreateService}>
                Tạo thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
