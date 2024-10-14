import React, { useEffect, useState } from "react";
import axios from '../../../Utils/axiosConfig' ;
import { useDispatch, useSelector } from "react-redux";
import {addUser} from '../../../redux/user'
import "./profile.css";



function Profile() {
  const dispatch = useDispatch();
  const {userLoggedIn} = useSelector((state) => state.user);
  const [data,setData] = useState({});
useEffect(()=>{
  setData({...userLoggedIn});

},[userLoggedIn])

  const uploadImage = async (event)=>{
    try {
    const file = event.target.files[0];

    // const formData = new FormData();
    // formData.append('image',file);
    // formData.append('id',userLoggedIn._id);

    const obj ={
      image : file,
      id : userLoggedIn._id
    }
        const response =  await axios.patch('/profileImage',obj,{
          headers :{
                'Content-Type' : 'multipart/form-data'
          } 
        });
        const { result } =  response.data ;
       dispatch(addUser(result))
      } catch (error) {
        console.log(error)
      }
      
    



  }

  return (
    <div className="main-container">
      <div className="container shadow content-container mt-5">
        <div className="profile-pic d-flex justify-content-center">
          <img
          className="border mt-5 profileImage"
            style={{ width: "90px", borderRadius: "120px" }}
            src={data.image ?`http://localhost:4000/uploadedImages/${data.image}` : '/loginImage.png'}
            alt="profilepic"
          />
          <div className="upload">
            <label htmlFor="file-upload" className="custom-file-label">
            <i class="fa-solid fa-pencil"></i>
            </label>
            <input onChange={uploadImage} type="file" id="file-upload" style={{ display: "none" }} />
          </div>
        </div>
        <h2 style={{ textAlign: "center" }}>{data.firstName + data.lastName}</h2>
        <div className="ms-5 p-5">
            <h5>First Name : {data.firstName}</h5>
            <h5>Last Name : { data.lastName}</h5>
            <h5>Email : {data.email}</h5>
        </div>
      </div>
    </div>
  );
}

export default Profile;
