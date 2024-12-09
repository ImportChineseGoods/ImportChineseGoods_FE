import { AppResource } from "../generals/constants/AppResource";
import axios from "./axios.custiomize";

const createProductApi = (data) => {
    const URL_API = "/product/new";
    const { name, shop, quantity, price, description, link, image_url, note } = data;

    if (!name || !shop || !quantity || !price || !description || !link) {
        return AppResource.invalidMessage
    }
    return axios.post(URL_API, data)
}

const getProductsApi = () => {
    const URL_API = "/product/";
    return axios.get(URL_API)
}

const updateProductApi = async (product) => {
    const URL_API = `/product/${product.id}`;
    return axios.patch(URL_API, product)
}

const deleteProductApi = async (product) => {
    const URL_API = `/product/${product.id}`;
    return axios.delete(URL_API)
}

export {
    createProductApi,
    getProductsApi,
    updateProductApi,
    deleteProductApi
}