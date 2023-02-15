import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Home from './Home'
import Payment from './Payment'
import ProductDetails from './ProductDetails'
import Auth from './Auth'
import PrivateRoute from './Auth/PrivateRoute'
import PaymetSuccess from './PaymetSuccess'
import AddNewProd from '../AdminPages/AddNewProd'
import AdminRoute from './Auth/AdminRoute'
import EditProduct from '../AdminPages/EditProduct'

const AllRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Auth />} />
                <Route path='/payment' element={<PrivateRoute> <Payment /></PrivateRoute>} />
                <Route path='/success' element={<PrivateRoute> <PaymetSuccess /></PrivateRoute>} />
                <Route path="/product/:id" element={<PrivateRoute> <ProductDetails /></PrivateRoute>} />
                <Route path='/admin/addProd' element={<AdminRoute> <AddNewProd /></AdminRoute>} />
                <Route path='/admin/editProd/:id' element={<AdminRoute> <EditProduct /></AdminRoute>} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default AllRoute
