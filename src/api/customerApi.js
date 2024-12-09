import axios from "./axios.custiomize";

const createCustomerApi = (name, phone, email, password) => {
    const URL_API = "/customer/register";
    const data = {
        name,
        phone,
        email,
        password
    }
    return axios.post(URL_API, data)
}

const loginCustomerApi = (email, password) => {
    const URL_API = "/customer/login";
    const data = {
        email,
        password
    }
    return axios.post(URL_API, data)
}

const customerListApi = (params) => {
    const URL_API = "/customer/customer";
    return axios.get(URL_API, {
        params: {
            page: params.page,
            pageSize: params.pageSize,
        },
    });
};

export {
    createCustomerApi,
    loginCustomerApi,
    customerListApi,

}