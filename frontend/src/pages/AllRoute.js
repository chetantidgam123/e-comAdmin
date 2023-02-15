import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Home from './Home'
import Payment from './Payment'
import ProductDetails from './ProductDetails'
import Auth from './Auth'

const AllRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Auth />} />
                <Route path='/payment' element={<Payment />} />
                <Route path="/Productspage/:id" element={<ProductDetails />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default AllRoute
