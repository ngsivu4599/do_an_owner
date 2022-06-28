import { api } from "../api";

export const handleRegister = (data) => {
  return api.post("auth/register", data);
};
