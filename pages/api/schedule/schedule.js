import axios from "axios";
import Cookies from "js-cookie";

export const scheduleAPI = {
  createChedule,
  deleteSchedule,
};

const token = Cookies.get("token");

function createChedule(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/admin/createschedule",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function deleteSchedule(id) {
  return axios.get(
    "http://18.216.251.104:5000/api/admin/delschedule/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
