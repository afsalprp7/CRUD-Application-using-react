import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAdmin, saveSearchResult } from "../../../redux/admin";
import axios from "../../../Utils/axiosConfig";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminDetails, searchResult } = useSelector((state) => state.admin);
  const [searchString, setSearchString] = useState();

  const logout = () => {
    dispatch(removeAdmin());
    navigate("/adminLogin");
  };

  const handleSearch = async (event) => {
    try {
      event.preventDefault();
      setSearchString(event.target.value);
      const response = await axios.post(`/searchUser`, {
        string: searchString,
      });

      dispatch(
        saveSearchResult(
          response.data.results.length === 0
            ? null
            : response.data.results
        )
      );
      console.log(searchResult);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow ">
        <div className="container-fluid d-flex  justify-content-between">
          <form className="d-flex" role="search">
            <input
              onChange={handleSearch}
              type="search"
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div
            style={{ width: "300px" }}
            className=" d-flex align-items-center"
          >
            <h5 className="me-3">{adminDetails ? adminDetails.name : ""}</h5>
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminHeader;
