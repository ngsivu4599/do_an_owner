import axios from "axios";
import Cookies from "js-cookie";

export const userandcoinAPI = {
  getAllUser,
  editCoin,
  editInfor,
};

const token = Cookies.get("token");

function getAllUser(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/getalluser", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function editCoin(id, body) {
  return axios.post(
    "http://18.216.251.104:5000/api/admin/editcoin/" + id,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function editInfor(id, body) {
  return axios.post(
    "http://18.216.251.104:5000/api/admin/editinfor/" + id,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
