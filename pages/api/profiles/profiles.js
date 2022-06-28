import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const profilesAPI = {
  getProfiles,
};

function getProfiles(headers) {
  return axios.get("http://18.216.251.104:5000/api/admin/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
