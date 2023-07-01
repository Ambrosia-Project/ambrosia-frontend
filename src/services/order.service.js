import Request from "../helpers/RequestHelper";
import SessionHelper from "../helpers/SessionHelper";

const API_URL = "/orderController";
const user = SessionHelper.getUser();

const addToCart = async (quantity_, id_) => {
  const res = await Request("post", API_URL + "/addToCart/", {
    email: user.email,
    quantity: quantity_,
    id: id_,
  });
  return res;
};
const getOrders = async (id) => {
  const res = await Request("post", API_URL + "/orders/", {
    email: id,
  });
  return res;
};
const orderNow = async (arr) => {
  const res = await Request("post", API_URL + "/order/", {
    email: user.email,
    orderList: arr,
  });
  return res;
};
const completeNow = async (id) => {
  const res = await Request("post", API_URL + "/order/complete/", {
    email: id,
  });
  return res;
};
const getAllOrders = async () => {
  const res = await Request("post", API_URL + "/order/waiter/");
  console.log(res);
  return res;
};

const orderService = {
  addToCart,
  getOrders,
  orderNow,
  completeNow,
  getAllOrders,
};

export default orderService;
