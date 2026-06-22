import React from 'react'
import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"

const Public = () => {
  const user = useSelector(state => state.auth.user);
  const isUserFetched = useSelector(state => state.auth.isUserFetched);

  if(!isUserFetched) return <div>Loading...</div>

  if(user) return <Navigate to={"/home"} />

  return (
    <Outlet />
  )
}

export default Public