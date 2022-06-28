import axios from "axios";

export const searchAPI = {
  getTinh,
  getHuyen,
  getXa,
  getTinhById,
  getHuyenById,
  getXaById,
};

function getTinh() {
  return axios.get("https://vapi.vnappmob.com/api/province/");
}

function getHuyen(id) {
  return axios.get("https://vapi.vnappmob.com/api/province/district/" + id);
}

function getXa(id) {
  return axios.get("https://vapi.vnappmob.com/api/province/ward/" + id);
}


function getTinhById(id){
  return axios.get("https://provinces.open-api.vn/api/p/"+id);
}

function getHuyenById(id){
  return axios.get("https://provinces.open-api.vn/api/d/"+id);
}

function getXaById(id){
  return axios.get("https://provinces.open-api.vn/api/w/"+id);
}



