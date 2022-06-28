import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { checkInAPI } from "../api/checkin/checkin";

const CheckIn = () => {
  const Router = useRouter();
  const [message, setMessage] = useState("");
  const [selectPlace, setSelectPlace] = useState([]);
  const initCheckIn = { codes: "" };
  const [code, setCode] = useState(initCheckIn);
  const {codes} = code;
  const [idPlace, setIdPlace] = useState("");

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res)
        setSelectPlace(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangePlace = (e) => {
    //   console.log(e.target.value)
    setIdPlace(e.target.value);
  };

  const handleSubmitCheckIn = (e) => {
    e.preventDefault();
    if(codes==="1234"){
      setMessage("Check In thành công");
    }else{
      setMessage("Check In không thành công");
    }
  };

  const handleChangeCode = (e) =>{
      const {name, value} = e.target
      setCode({...code, [name]:value})
  }

  return (
    <div className="checkin">
      <div className="container">
        <h3 className="checkin-h3">Hãy chọn địa điểm để nhận mã CheckIn</h3>
        <div className="checkin-select">
          <select
            name="place"
            className="checkin-select-place"
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
        <h3 className="checkin-h3">Hãy nhập mã check in</h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="codes"
            onChange={handleChangeCode}
          />
        </InputGroup>
        <h1>{message}</h1>
        <div className="checkin-submit-place">
          <Button
            variant="secondary"
            className="checkin-submit-place-button"
            onClick={handleSubmitCheckIn}
          >
            Check In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
