import Request from "../helpers/RequestHelper";

const API_URL = "/allergiesController";

const getAllergies = async () => {
    const res = await Request("post", API_URL + "/getAll/");
    return res;
}


const userService = {
    getAllergies,
};

export default userService;