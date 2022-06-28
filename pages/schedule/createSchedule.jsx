import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { placeAPI } from "../api/place/place";
import { uploadAPI } from "../api/upload/upload";
import { scheduleAPI } from "../api/schedule/schedule";
import { ptAPI } from "../api/pt/pt";

const CreateSchedule = () => {
  const initSchedule = {
    name: "",
    thongtinthem: "",
    soluong: "",
    gia: "",
    thoigianbatdau: "",
    thoigianketthuc: "",
  };
  const [adminSchedule, setAdminSchedule] = useState(initSchedule);
  const { name, thongtinthem, soluong, gia, thoigianbatdau, thoigianketthuc } =
    adminSchedule;
  const [idPlace, setIdPlace] = useState("");
  const [idPt, setIdPt] = useState("");
  const [selectPlace, setSelectPlace] = useState([]);
  const [inputFile, setInputFile] = useState();
  const [image, setImage] = useState();
  const [selectPt, setSelectPt] = useState([]);
  const Router = useRouter();
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );
  const [finishDate, setFinishDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res.data)
        setSelectPlace(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    ptAPI.getAllPt().then((res) => {
      console.log(res);
      setSelectPt(res.data);
    });
  }, []);

  const handleChangePlace = (e) => {
    //   console.log(e.target.value)
    setIdPlace(e.target.value);
  };

  const handleChangePt = (e) => {
    setIdPt(e.target.value);
  };

  const handleChangeSchedule = (e) => {
    const { name, value } = e.target;
    setAdminSchedule({ ...adminSchedule, [name]: value });
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

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      place: idPlace,
      pt: idPt,
      image: image,
      thongtinthem: thongtinthem,
      soluong: soluong,
      gia: gia,
      thoigianbatdau: thoigianbatdau,
      thoigianketthuc: thoigianketthuc,
    };
    scheduleAPI
      .createChedule(body)
      .then((res) => {
        console.log(res);
        Router.replace("/schedule/getAllSchedule");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Thêm lịch hẹn mới</h1>

        <div className="profile-gird-name">
          <label htmlFor="name" className="profile-textlabel">
            Chọn PT
          </label>
          <br />

          <div className="pt-select">
            <select
              name="place"
              className="pt-select-place"
              onChange={handleChangePt}
            >
              <option selected disabled>
                Choose an option
              </option>
              {selectPt.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="name" className="profile-textlabel">
            Chọn địa điểm
          </label>
          <br />
          <div className="pt-select">
            <select
              name="pt"
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
            Tên lịch hẹn
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="name"
            onChange={handleChangeSchedule}
          />

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
            onChange={handleChangeSchedule}
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
            onChange={handleChangeSchedule}
          />

          <label htmlFor="name" className="profile-textlabel">
            Giá
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="gia"
            onChange={handleChangeSchedule}
          />

          <label htmlFor="name" className="profile-textlabel">
            Thời gian bắt đầu
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="thoigianbatdau"
            onChange={handleChangeSchedule}
          />
          {/* <DatePicker
            // selected={startDate}
            value={startDate}
            onChange={(date) => setStartDate(date)}
          /> */}
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              // console.log(startDate)
            }}
            showTimeSelect
            minTime={setHours(setMinutes(new Date(), 0), 6)}
            maxTime={setHours(setMinutes(new Date(), 30), 20)}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="profile-input"
            style={{ width: "100%" }}
          /> */}

          <label htmlFor="name" className="profile-textlabel">
            Thời gian kết thúc
          </label>
          <br />
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          /> */}
          {/* <DatePicker
            selected={finishDate}
            onChange={(date) => {
              setFinishDate(date);
              // console.log(startDate)
            }}
            showTimeSelect
            minTime={setHours(setMinutes(new Date(), 0), 6)}
            maxTime={setHours(setMinutes(new Date(), 30), 20)}
            className="profile-input"
            dateFormat="MMMM d, yyyy h:mm aa"
          /> */}
          <input
            id="name"
            type="text"
            className="profile-input"
            name="thoigianketthuc"
            onChange={handleChangeSchedule}
          />
        </div>
        <div className="button-container">
          <button className="profile-button" onClick={handleCreateSchedule}>
            Tạo thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
