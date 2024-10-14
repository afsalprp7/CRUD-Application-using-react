import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './login.css'
import axios from '../../../Utils/axiosConfig';
import { useSelector,useDispatch } from 'react-redux';
import { addUser } from '../../../redux/user';


function Login() {
  const dispatch = useDispatch();
  const {userLoggedIn} = useSelector((state)=>state.user)
  console.log(userLoggedIn);


const [formData,setFormData] = useState({});
const [error,setError] = useState({});
const [serverError,setServerError] = useState();
const navigate = useNavigate();




const handleInput =(event)=>{
  setFormData({
    ...formData,
    [event.target.name] : event.target.value
  })
}


const handleSubmit =(event)=>{
  event.preventDefault();
  const formError = {};

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!formData.email){
    formError.email = 'This field cannot be empty'
  }else if(!validEmail.test(formData.email)){
    formError.email = 'Invalid email address'
  }

  let passwordUppercase = /^(?=.*?[A-Z])/;
  let passwordLower = /^(?=.*?[a-z])/;
  let passwordDigit = /^(?=.*?[0-9])/;
  let passwordSpecial = /^(?=.*?[#?!@$%^&*-])/;
  if(!formData.password){
    formError.password = 'This field cannot be empty';
  }else if(!passwordUppercase.test(formData.password)){
    formError.password = 'Password need at least one uppercase'
  }else if(!passwordLower.test(formData.password)){
    formError.password = 'Password need at least one lowercase'
  }else if(!passwordDigit.test(formData.password)){
    formError.password = 'Password need at least one number or digit'
  }else if(!passwordSpecial.test(formData.password)){
    formError.password = 'Password need at least one special character'
  }

  setError({
    ...formError
  });

  const submit = async ()=>{
    try{
      if(Object.keys(formError).length === 0 ){
      const response = await axios.post('/login',formData);
      if(response.statusText === 'OK'){
         dispatch(addUser(response.data.user));
        navigate('/')
      }
      }
    }catch(error){
      if(error.response.data === 'Password Incorrect'){
        setServerError('Password Incorrect')
      }else if(error.response.data === 'No user Found'){
        setServerError('No user Found Please SignUp')
      }else{
        console.log(error)
      }
      
    }
  }

  submit();

  
  
}

  return (
    <div style={{height:'100vh'}} className='login-main-container  d-flex justify-content-center align-items-center'>
        <div style={{maxWidth:"700px"}} className='sub-container row border border-info  p-5 '>
        <div className='col-md-6 d-flex justify-content-center align-items-center p-5'>
        <img style={{maxWidth:'200px'}} src='/loginImage.png' alt='imageLogin' />
        </div>
        <div className='col-md-6'>
            <form onSubmit={handleSubmit}>
            <h1 className='mb-5 ms-5'>User Login</h1>
            {serverError && <h6 style={{textAlign:'center',color:'red'}}>{serverError}</h6>}
                <div className='mb-4'>
                <label className='mb-1'>Email</label>
                <input type="" name='email' className='form-control form-input shadow p-2' placeholder='Enter your email' onChange={handleInput}/>
                {error && <p style={{fontSize:'x-small',color:'red'}}>{error.email}</p>}
                </div>
                <div>
                <label className='mb-1'>Password</label>
                <input type="Password" name='password' className='form-control shadow form-input p-2'placeholder='Enter the password' onChange={handleInput} />
               {error &&  <p style={{fontSize:'x-small',color:'red'}}>{error.password}</p>}
                
                </div>
                <div className='d-flex justify-content-center mt-4 mb-3'>
                <button type='submit' className='btn btn-primary shadow px-5'>Login</button>
        </div>
            </form>
        <div className='d-flex justify-content-center'>
          <small>Don't have an Account? <Link to='/signup'>SignUp</Link></small>
        </div>
        </div>
        
        </div>

    </div>
  )
}

export default Login

