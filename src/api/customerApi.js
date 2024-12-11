import axios from "./axios.custiomize";

export const customerApi = {
    createCustomer: (name, phone, email, password) => {
        const URL_API = "/customer/register";
        const data = {
            name,
            phone,
            email,
            password
        }
        return axios.post(URL_API, data)
    },

    loginCustomer: (email, password) => {
        const URL_API = "/customer/login";
        const data = {
            email,
            password
        }
        return axios.post(URL_API, data)
    }
}