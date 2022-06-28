import axios from "axios";
import Cookies from "js-cookie";

export const onlineAPI = {
  createOnline,
  getAllOnline,
  deleteOnline,
};

const token = Cookies.get("token");

function createOnline(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/online", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getAllOnline() {
  return axios.get("http://18.216.251.104:5000/api/admin/online", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteOnline(id) {
  return axios.get("http://18.216.251.104:5000/api/admin/delonline/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
