import axios from "../../../Utils/axiosConfig";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditForm() {
  const navigate = useNavigate();
  const { editUser } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(editUser.user);
  }, []);

  const [error, setError] = useState();
  const [serverError, setServerError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formError = {};
    if (!formData.firstName) {
      formError.firstName = "This field cannot be empty";
    } else if (Number(formData.firstName)) {
      formError.firstName = "First name is not valid";
    }

    if (!formData.lastName) {
      formError.lastName = "This field cannot be empty";
    } else if (Number(formData.lastName)) {
      formError.firstName = "First name is not valid";
    }

    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      formError.email = "This field cannot be empty";
    } else if (!email.test(formData.email)) {
      formError.email = "Invalid email";
    }
    setError({
      ...formError,
    });

    if (Object.keys(formError).length === 0) {
      const response = await axios.patch(
        `/doEditUser/${formData._id}`,
        formData
      );
      if (response.status === 200) {
        navigate("/adminhome");
      } else {
        setServerError("Something went wrong");
      }
    }
  };
  return (
    <div
      style={{ height: "100vh", paddingTop: "100px" }}
      className="signup-main-cntainer d-flex justify-content-center align-items-center"
    >
      <div style={{ width: "600px" }} className="shadow-lg p-4 m">
        <div className="d-flex justify-content-center">
          <img style={{ width: "50px" }} src="/loginImage.png" alt="" />
        </div>
        <h1 style={{ textAlign: "center" }} className="mb-4">
          Edit user
        </h1>
        {serverError && (
          <h4 style={{ textAlign: "center", color: "red" }}>{serverError}</h4>
        )}
        <div>
          <form onSubmit={handleSubmit}>
            <label className="label-control ">First Name</label>
            <input
              value={formData.firstName}
              type="text"
              className="form-control shadow"
              name="firstName"
              placeholder="Enter your first name"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            {error && (
              <p style={{ fontSize: "x-small" }} className="text-danger">
                {error.firstName}
              </p>
            )}

            <label className="label-control mt-2">Last Name</label>
            <input
              value={formData.lastName}
              type="text"
              className="form-control shadow"
              name="lastName"
              placeholder="Enter your last name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {error && (
              <p style={{ fontSize: "x-small" }} className="text-danger">
                {error.lastName}
              </p>
            )}

            <label className="label-control mt-2">Email</label>
            <input
              value={formData.email}
              type="text"
              className="form-control shadow"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            {error && (
              <p style={{ fontSize: "x-small" }} className="text-danger">
                {error.email}
              </p>
            )}

            <button className="btn btn-primary px-4 mt-4" type="submit">
              Make changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
