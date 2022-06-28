import axios from "axios";
import Cookies from "js-cookie";

export const courseAPI = {
  createCourse,
  getAllCourse,
  deleteCourse,
};

const token = Cookies.get("token");

function createCourse(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/createcourse", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getAllCourse() {
  return axios.get("http://18.216.251.104:5000/api/admin/getallcourse", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteCourse(id) {
  return axios.get(
    "http://18.216.251.104:5000/api/admin/delschedule/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
