import React from 'react'
import { Navigate } from 'react-router-dom'

const Protectedroutes = ({children}) => {
    

    const currentuser = localStorage.getItem("isLoggedIn")
  return currentuser ? children : <Navigate to = "/"/>
}

export default Protectedroutes
