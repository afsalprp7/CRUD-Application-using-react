import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// page imports
import LoginPage from "./pages/user/loginPage";
import SignupPage from "./pages/user/SignupPage";
import HomePage from "./pages/user/HomePage";
import ProfilePage from "./pages/user/ProfilePage";
import Privateroute from "./components/user/headerComponent/Privateroute";
import ProfilePrivateRoute from './components/user/profileComponent/PrivateRoute';
import AdminLogin from "./pages/admin/Login"
import AdminHome from "./pages/admin/adminHome";
import {AdminPrivate,Loginprivate} from "./components/admin/privateRoute/AdminPrivate";
import EditUser from "./pages/admin/EditUser";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route element={<ProfilePrivateRoute/>}>
          <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<Privateroute/>}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* admin login */}
          <Route element={<AdminPrivate/>}>
          <Route path="/adminLogin" element={<AdminLogin />} />
          </Route>

          <Route element={<Loginprivate/>}>
          <Route path="/adminhome" element={<AdminHome/>} />
          <Route path="/edituser" element={<EditUser/>} />
          </Route>

          

        </Routes>
      </Router>
    </div>
  );
}

export default App;
