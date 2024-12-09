import axios from "./axios.custiomize";

const parametersApi = (type) => {
    const URL_API = `/parameter/${type}`;
    return axios.get(URL_API);
};

export {
    parametersApi

}