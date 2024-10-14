import React from 'react'
import './Header.css'
import {useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {removeUser} from '../../../redux/user'


function Header() {
    const dispatch = useDispatch()
    const {userLoggedIn} = useSelector((state)=>state.user)
    const navigate = useNavigate();
const handleChange =(event)=>{
    const selectedValue = event.target.value ;
    if(selectedValue === 'login'){
        navigate('/login')
    }else{
        navigate('/signup')
    }
}

const logoutUser =()=>{
    dispatch(removeUser());
}
  return (
    <div>
    <nav className='navbar border-bottom shadow'>
    <div className='left-div'>
        <h1>User Home</h1>
    </div>
{userLoggedIn ? <div className='right-section-loggedin d-flex align-items-center justify-content-between'>
            <button onClick={logoutUser} className='btn btn-outline-danger me-4'>Logout</button> 
            <Link style={{textDecoration:'none',color:'black'}} to='/profile'>
            <div className='d-flex align-items-center justify-content-between'>
            <img src={ userLoggedIn.image ? `http://localhost:4000/uploadedImages/${userLoggedIn.image}` : "/loginImage.png"} alt="userImage" />
            <h6 className='ms-2'>{userLoggedIn.firstName + userLoggedIn.lastName}</h6>
            </div>
            </Link>
    </div>:<div className='right-div'>
        <select name="" id="" className='form-select' onChange={handleChange}>
            <option selected hidden><strong>Login/Signup</strong></option>
            <option value="login">LogIn</option>
            <option  value="signup">SignUp</option>
        </select>
    </div>}
    
    
    </nav>
    </div> 
  )
}

export default Header
