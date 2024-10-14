import React, { useEffect, useState } from "react";
import axios from "../../../Utils/axiosConfig";
import "./AdminContent.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEditUserData } from "../../../redux/admin";

function AdminContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.admin);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/adminContent");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [buttonClicked]);

 
  const handleEdit = async (id) => {
    const response = await axios.get(`/editUser/${id}`);

    dispatch(addEditUserData(response.data));

    navigate("/edituser");
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm("Do you really Want to delete this user?");
    if (confirm) {
      const response = await axios.delete(`/deleteUser/${id}`);
      if (response.status === 200) {
        alert("Deleted Successfully");
        setButtonClicked(true);
      }
    }
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="container shadow mt-5">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
  {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
    searchResult.map((data, index) => (
      <tr key={data._id}>
        <td scope="row">{index + 1}</td>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.email}</td>
        <td>
          <i
            onClick={() => deleteUser(data._id)}
            style={{ cursor: "pointer", color: "red" }}
            className="fa-solid fa-trash me-3"
          ></i>
          <i
            onClick={() => handleEdit(data._id)}
            style={{ cursor: "pointer", color: "blue" }}
            className="fa-regular fa-pen-to-square"
          ></i>
        </td>
      </tr>
    ))
  ) : (
    data && Array.isArray(data) && data.length > 0 ? (
      data.map((data, index) => (
        <tr key={data._id}>
          <td scope="row">{index + 1}</td>
          <td>{data.firstName}</td>
          <td>{data.lastName}</td>
          <td>{data.email}</td>
          <td>
            <i
              onClick={() => deleteUser(data._id)}
              style={{ cursor: "pointer", color: "red" }}
              className="fa-solid fa-trash me-3"
            ></i>
            <i
              onClick={() => handleEdit(data._id)}
              style={{ cursor: "pointer", color: "blue" }}
              className="fa-regular fa-pen-to-square"
            ></i>
          </td>
        </tr>
      ))
    ) : null
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminContent;
