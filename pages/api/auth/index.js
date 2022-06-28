import { api } from "../api";

class AuthService {
  handleLogin = (params) => {
    return api.post("auth/login", params);
  };

  handleRegister = (params) => {
    return api.post("auth/register", params);
  };
}

const authService = new AuthService();

export default authService;
