import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthState } from '../../Context/AuthProvider'

const PrivateRoute = ({ children }) => {
    const { user } = AuthState()
    if (!user) {
        return <Navigate to="/" />
    }
    return children
}

export default PrivateRoute
