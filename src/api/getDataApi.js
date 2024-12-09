import axios from "./axios.custiomize";

const overviewData = () => {
    const URL_API = "/get/overview";
    return axios.get(URL_API);
};

export {
    overviewData
}