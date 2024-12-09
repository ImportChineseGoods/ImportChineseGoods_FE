import axios from "./axios.custiomize";

const createConsignmentApi = (data) => {
    const URL_API = "/consignment/new";
    const { note, warehouse_id, bol_code} = data;
    if (!bol_code || !warehouse_id) {
        return AppResource.invalidMessage
    }

    return axios.post(URL_API, data)
}

const deleteConsignmentApi = (consignment) => {
    const URL_API = `/consignment/${consignment.id}`;
    return axios.delete(URL_API)
}

const getAllConsignmentApi = (page, pageSize) => {
    const URL_API = `/consignment/customer?page=${page}&pageSize=${pageSize}`;
    return axios.get(URL_API)
}

export {
    createConsignmentApi,
    deleteConsignmentApi,
    getAllConsignmentApi
}