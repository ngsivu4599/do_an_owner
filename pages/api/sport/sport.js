import axios from "axios";
import Cookies from "js-cookie";

export const sportAPI = {
  getSport,
  createSport,
  createSportPlace,
  updateStatusSport,
  deleteSport,
  deleteService,
};

const token = Cookies.get("token");

function deleteService(id) {
  return axios.get(
    "http://18.216.251.104:5000/api/admin/delServiceSportById/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function getSport() {
  return axios.get("http://18.216.251.104:5000/api/admin/getsport", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteSport(id) {
  return axios.get("http://18.216.251.104:5000/api/admin/delsport/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createSport(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/createsport", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createSportPlace(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/admin/createsportplace",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function updateStatusSport(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/admin/updateStatusSport",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
