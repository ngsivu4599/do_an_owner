import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { placeAPI } from "../api/place/place";
import { ptAPI } from "../api/pt/pt";
import { Image } from "react-bootstrap";
import { uploadAPI } from "../api/upload/upload";

const CreatePT = () => {
  const Router = useRouter();
  const initPtState = {
    name: "",
    ngaysinh: "",
    sodienthoai: "",
    thongtinthem: "",
  };
  const [adminPt, setAdminPt] = useState(initPtState);
  const { name, ngaysinh, sodienthoai, thongtinthem } = adminPt;
  const [selectPlace, setSelectPlace] = useState([]);
  const [idPlace, setIdPlace] = useState("");
  const [inputFile, setInputFile] = useState();
  const [image,setImage] = useState();

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res)
        setSelectPlace(res.data);
      })
      .catch((err) => console.log(err));
  });

  const handleChangePt = (e) => {
    const { name, value } = e.target;
    setAdminPt({ ...adminPt, [name]: value });
  };

  const handleChangeImage = (e) => {
    console.log(e.target.files[0]);
    setInputFile(e.target.files[0]);
  };

  useEffect(()=>{
    console.log(inputFile)
    uploadAPI.uploadAvatarAPI(inputFile)
      .then(res => {
        // console.log(res.data.link)
        setImage(res.data.link)
      })
      .catch(err => console.log(err))
  },[inputFile])

  const handleChangePlace = (e) => {
    console.log(e.target.value);
    setIdPlace(e.target.value);
  };

  const handleCreatePt = (e) => {
    e.preventDefault();
    const body = {
      "name": name,
      "ngaysinh": ngaysinh,
      "sodienthoai": sodienthoai,
      "thongtinthem": thongtinthem,
      "image": image,
      "place": idPlace
    };
    ptAPI
      .createPt(body)
      .then((res) => {
        // console.log(res);
        Router.replace("/pt/getallpt");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Create PT</h1>

        <div className="profile-gird-name">
          <label htmlFor="name" className="profile-textlabel">
            Địa điểm
          </label>
          <br />

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
                <option key={place.id} value={place.id}>{place.diachi}</option>
              ))}
            </select>
          </div>

          <label htmlFor="name" className="profile-textlabel">
            Name
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            onChange={handleChangePt}
            name="name"
          />

          <label htmlFor="name" className="profile-textlabel">
            Ngày sinh
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            onChange={handleChangePt}
            name="ngaysinh"
          />

          <label htmlFor="name" className="profile-textlabel">
            Số điện thoại
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            onChange={handleChangePt}
            name="sodienthoai"
          />

          <label htmlFor="name" className="profile-textlabel">
            Image
          </label>
          <br />
          <input
            id="name"
            type="file"
            className="profile-input"
            onChange={handleChangeImage}
            name="image"
          />
          <Image style={{width:"50%"}} src={image} alt="load"></Image>
          <br />

          <label htmlFor="name" className="profile-textlabel">
            Thông tin thêm
          </label>
          <br />
          <textarea
            id="name"
            className="profile-input"
            onChange={handleChangePt}
            name="thongtinthem"
          ></textarea>

          {/* <label htmlFor="name" className="profile-textlabel">
            Địa điểm
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            onChange={handleChangePt}
            name="place"
          /> */}
        </div>
        <div className="button-container">
          <button className="profile-button" onClick={handleCreatePt}>
            Tạo thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePT;
