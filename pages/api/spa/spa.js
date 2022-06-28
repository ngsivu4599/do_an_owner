import axios from "axios";
import Cookies from "js-cookie";

export const spaAPI = {
  createSpa,
  getAllSpa,
  updateStatusSpa,
  deleteSpa,
  deleteService,
};

const token = Cookies.get("token");

function deleteService(id) {
  return axios.get(
    "http://18.216.251.104:5000/api/admin/delServiceSpaById/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createSpa(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/createspa", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteSpa(id) {
  return axios.get("http://18.216.251.104:5000/api/admin/delspa/" + id, {
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

function updateStatusSpa(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/admin/updateStatusSpa",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
