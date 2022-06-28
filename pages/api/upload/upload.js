import axios from "axios";
import Cookies from "js-cookie";

export const uploadAPI = {
  uploadAvatarAPI,
};

const token = Cookies.get("token");

function uploadAvatarAPI(inputFile) {
  let formdata = new FormData();
  formdata.append("file", inputFile);
  return axios.post("http://18.216.251.104:5000/api/upload/avatar", formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
