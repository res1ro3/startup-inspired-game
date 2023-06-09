import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteUser = ({admin}) => {
  return (
    admin ? <Outlet /> : <Navigate to="/home" />
  )
}

export default PrivateRouteUser