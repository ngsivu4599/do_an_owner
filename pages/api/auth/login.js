import { api } from "../api";

export const handleLogin = (data) => {
  console.log(data)
  return api.post("auth/login", data);
};
