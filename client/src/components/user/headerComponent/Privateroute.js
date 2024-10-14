import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function Privateroute() {
  const { userLoggedIn } = useSelector((state) => state.user);
  return !userLoggedIn ? <Outlet /> : <Navigate to='/' />;
}

export default Privateroute;