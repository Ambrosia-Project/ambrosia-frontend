import Request from "../helpers/RequestHelper";
import SessionHelper from "../helpers/SessionHelper";

const API_URL = "menuController";
const user = SessionHelper.getUser();
console.log(user);

const getMenuList = async (menuName) => {
  console.log(menuName);
  const res = await Request("post", API_URL + "/menu/", {
    email: user.email,
    type: menuName,
  });
  return res;
};
const getFilteredMenu = async (props) => {
  let newProps = { ...props, email: user.email };
  const res = await Request("post", API_URL + "/menu/filter/", newProps);
  console.log(res);
  return res;
};
const getMenuDetails = async (id_) => {
  const res = await Request("post", API_URL + "/detail/", {
    id: id_,
    email: user.email,
  });
  console.log(res);
  return res;
};

const menuListService = {
  getMenuList,
  getFilteredMenu,
  getMenuDetails,
};

export default menuListService;
