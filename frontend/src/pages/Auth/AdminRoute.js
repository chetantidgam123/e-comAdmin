import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthState } from '../../Context/AuthProvider'

const AdminRoute = ({ children }) => {
    const { user } = AuthState()
    if (!user) {
        return <Navigate to="/login" />
    } else if (user?.role == 'admin') {
        return children
    }
    return
}

export default AdminRoute
