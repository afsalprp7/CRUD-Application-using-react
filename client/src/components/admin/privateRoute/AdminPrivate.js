import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function AdminPrivate() {
    const {adminDetails} = useSelector((state)=>state.admin) ;

  return !adminDetails ? <Outlet/> : <Navigate to='/adminHome'/>
}


function Loginprivate(){
    const {adminDetails} = useSelector((state)=>state.admin) ;

    return adminDetails ? <Outlet/> : <Navigate to='/adminLogin'/>
}

export {Loginprivate , AdminPrivate} ;

