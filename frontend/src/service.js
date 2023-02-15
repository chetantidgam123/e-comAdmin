import axios from "axios"
const Url = "http://localhost:3066/"
const token = JSON.parse(localStorage.getItem('token')) || ''
const config = {
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
    },
}


function registration(body) {
    return axios.post(Url+"signup", body, config)
}
function login(body) {
    return axios.post(Url + "login", body, config)
}

function getProductList() {
    return axios.get(Url + "products", config)
}
function AddtoCart(id) {
    return axios.get(Url + "user/addtocart/"+id, config)
}
function getUserCart() {
    return axios.get(Url + "user/cartitem", config)
}
function updateQty(id,data) {
    return axios.put(Url + "user/cartitem/"+id,data, config)
}


export { registration, login, getProductList,AddtoCart,getUserCart,updateQty }