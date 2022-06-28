import axios from "axios";
import Cookies from "js-cookie";

export const checkInAPI = {
    checkIn,
}

const token = Cookies.get("token");

function checkIn(body){
    return axios.post("http://18.216.251.104:5000/api/admin/checkin", body, {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}