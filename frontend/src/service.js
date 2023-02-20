import axios from "axios"
const Url = "http://localhost:3066/"
// const Url = "https://ecomservice.onrender.com/"
const token = JSON.parse(localStorage.getItem('token')) || ''
const config = {
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    },
}


function registration(body) {
    return axios.post(Url + "signup", body, config)
}
function login(body) {
    return axios.post(Url + "login", body, config)
}

function getProductList() {
    return axios.get(Url + "products", config)
}
function getProdutDetails(id) {
    return axios.get(Url + "product/" + id, config)
}
function AddtoCart(id) {
    return axios.get(Url + "user/addtocart/" + id, config)
}
function getUserCart() {
    return axios.get(Url + "user/cartitem", config)
}
function ClearCart() {
    return axios.get(Url + "user/clearcart", config)
}
function updateQty(id, data) {
    return axios.put(Url + "user/cartitem/" + id, data, config)
}
function addProduct(data) {
    return axios.post(Url + "admin/addProd", data, config)
}
function updateProd(id, data) {
    return axios.put(Url + "admin/updateProd/" + id, data, config)
}
function removeProd(id) {
    return axios.get(Url + "admin/removeProd/" + id, config)
}
function addPurchaseItem(data) {
    return axios.post(Url + "admin/addPurchaseItem", data, config)
}
function getPurchaseList() {
    return axios.get(Url + "admin/getPurchaseList", config)
}


export { registration, login, getProductList, AddtoCart, getUserCart, updateQty, getProdutDetails, ClearCart, addProduct, updateProd, removeProd, addPurchaseItem, getPurchaseList }