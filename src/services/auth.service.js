import Request from "../helpers/RequestHelper";

const API_URL = "authController";

const login = async (user) => {
  const res = await Request("post", API_URL + "/login/", user);
  return res;
};

const register = async (user) => {
  const res = await Request("post", API_URL + "/register/", user);
  return res;
};

const forgetPassword = async (user) => {
  const res = await Request("post", API_URL + "/forgetPassword/", user);
  return res;
};

const checkUserConfirmationCode = async (user) => {
  const res = await Request("post", API_URL + "/confirmUser/", user);
  return res;
};

const setNewPassword = async (user) => {
  const res = await Request("update", API_URL + "/updatePassword/", user);
  return res;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  register,
  forgetPassword,
  checkUserConfirmationCode,
  setNewPassword,
  getCurrentUser,
};

export default authService;
