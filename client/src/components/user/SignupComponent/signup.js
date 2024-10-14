import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../../../Utils/axiosConfig";
import "./signup.css";
function Signup() {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState();
  const [serverError,setServerError] = useState();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError('');

    const formError = {} ;

    if(!formData.firstName){
      formError.firstName = 'This field cannot be empty'
    }else if(Number(formData.firstName)){
      formError.firstName = 'First name is not valid'
    }
    
    if(!formData.lastName){
      formError.lastName = 'This field cannot be empty';
    }else if(Number(formData.lastName)){
      formError.firstName = 'First name is not valid'
    }

    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!formData.email){
      formError.email = 'This field cannot be empty'
    }else if(!email.test(formData.email)){
      formError.email = 'Invalid email'
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

    if(!formData.confirmPassword){
      formError.confirmPassword = 'This field cannot be empty'
    }else if(formData.password !== formData.confirmPassword){
      formError.confirmPassword = 'Password doesn\'t match'
    }

    
    setError({
      ...formError
    });

    const submit = async () =>{
      try{
        if(Object.keys(formError).length === 0){
            await axios.post('/signup',formData);
            navigate('/login');
          }
      }catch(error){
        if(error.response.status === 409){
          setServerError('User already exists');
        }else{
          console.error(error);
        }
      }
    }
    submit() ;
   
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="signup-main-container d-flex justify-content-center align-items-center"
    >
      <div style={{ width: "600px" }} className="sub-container p-4 m">
        <div className="d-flex justify-content-center">
          <img style={{ width: "50px" }} src="/loginImage.png" alt="" />
        </div>
        <h1 style={{ textAlign: "center" }} className="mb-4">
          Create an Account
        </h1>
        {serverError && <h4 style={{ textAlign: "center",color:'red' }}>{serverError}</h4>}
        <div>
          <form onSubmit={handleSubmit}>
            <label className="label-control ">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="Enter your first name"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
           {error && <p style={{fontSize:'x-small'}} className="text-danger">{error.firstName}</p>} 

            <label className="label-control mt-2">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Enter your last name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
            />
           {error && <p style={{fontSize:'x-small'}} className="text-danger">{error.lastName}</p>} 

            <label className="label-control mt-2">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
           {error && <p style={{fontSize:'x-small'}} className="text-danger">{error.email}</p>} 

            <label className="label-control mt-2">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
           {error && <p style={{fontSize:'x-small'}} className="text-danger">{error.password}</p>} 

            <label className="label-control mt-2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm your Password"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
           {error && <p style={{fontSize:'x-small'}} className="text-danger">{error.confirmPassword}</p>} 
              <div className="mt-4">
              <button className="btn text-white btn-primary px-5">SignUp</button>
            <small className="ms-3">
              Allready have an Account? <Link to="/login">LogIn</Link>
            </small>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
