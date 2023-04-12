import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteUser = ({user, admin}) => {
  return (
    user ? <Outlet /> : <Navigate to="/signin" />
  )
}

export default PrivateRouteUser