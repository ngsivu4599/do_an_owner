import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const ptAPI = {
  getAllPt,
  createPt,
  deletePt,
};

function getAllPt() {
  return axios.get("http://18.216.251.104:5000/api/admin/getallpt", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createPt(body) {
  return axios.post("http://18.216.251.104:5000/api/admin/creatept", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deletePt(id){
  return axios.get("http://18.216.251.104:5000/api/admin/delpt/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
