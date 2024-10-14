import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../redux/store'
import { Outlet,Navigate } from 'react-router-dom';

function PrivateRoute() {
    const {userLoggedIn} = useSelector((store)=>store.user);
  return userLoggedIn ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoute
