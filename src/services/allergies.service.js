import Request from "../helpers/RequestHelper";

const API_URL = "allergyController";

const getAllergies = async () => {
    const res = await Request("post", API_URL + "/");
    return res;
}


const userService = {
    getAllergies,
};

export default userService;