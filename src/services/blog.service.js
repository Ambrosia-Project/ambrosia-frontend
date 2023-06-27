import Request from "../helpers/RequestHelper";

const API_URL = "/blogController";

const fetchData = async () => {
    const res = await Request("post", API_URL + "/blogs/");
    return res;
};

const getBlogById = async (id) => {
    const res = await Request("post", API_URL + "/blogs/" + id + "/");
    return res;
};

const create = async (data) => {
    const res = await Request("post", API_URL + "/create/", data);
    return res;
};

const blogService = {
    fetchData,
    getBlogById,
    create,
};

export default blogService;
