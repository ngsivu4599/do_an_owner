import axios from "axios";
import Cookies from "js-cookie";

export const serviceAPI = {
  createService,
};

const token = Cookies.get("token");

function createService(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/createspaservice", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getAllSpa() {
  return axios.get("http://18.216.251.104:5000/api/admin/getspa", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
