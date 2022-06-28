import React from "react";
import { useEffect } from "react";
import withAuth from "../HOC/withAuth";
import { profilesAPI } from "../api/profiles/profiles";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Profiles = () => {
  const inforadmin = { name: "", phonenumber: "", place: "" };
  const [adminData, setAdminData] = useState(inforadmin);
 
  useEffect(() => {
    profilesAPI.getProfiles()
      .then((res) => {
        console.log(res.data.admin);
        setAdminData(res.data.admin)
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Admin Profiles</h1>

        <div className="profile-gird-name">
          <label htmlFor="name" className="profile-textlabel">
            Name
          </label>
          <br />
          <input id="name" type="text" className="profile-input" value={adminData.name}/>
          <label htmlFor="name" className="profile-textlabel">
            PhoneNumber
          </label>
          <br />
          <input id="name" type="text" className="profile-input" value={adminData.phonenumber}/>
        </div>
        <div className="button-container">
          <button className="profile-button">
            Lưu Thông Tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profiles);
