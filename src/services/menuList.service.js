import Request from "../helpers/RequestHelper";

const API_URL = "/menuController";

const getMenuList = async (menuName) => {
  console.log(menuName);
  const res = await Request("post", API_URL + "/menu/", {
    type: menuName,
  });
  return res;
};

const menuListService = {
  getMenuList,
};

export default menuListService;
