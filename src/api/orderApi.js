import axios from "./axios.custiomize";

const createOrderApi = (data) => {
    const URL_API = "/order/new";
    const { note, warehouse_id, products } = data;
    if (!products || products.length === 0 || !warehouse_id) {
        return AppResource.invalidMessage
    }

    return axios.post(URL_API, data)
}

const getAllOrderApi = (page, pageSize) => {
    const URL_API = `/order/customer?page=${page}&pageSize=${pageSize}`;
    return axios.get(URL_API)
}

const getOrderByIdApi = (id) => {
    const URL_API = `/order/${id}`;
    return axios.get(URL_API)
}

export {
    createOrderApi,
    getAllOrderApi,
    getOrderByIdApi
}