import React from 'react'
import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"

const Protected = () => {
  const user = useSelector(state => state.auth.user);
  const isUserFetched = useSelector(state => state.auth.isUserFetched);

  if(!isUserFetched) return <div>Loading...</div>

  if(!user) return <Navigate to={"/"} />

  return (
    <Outlet />
  )
}

export default Protected