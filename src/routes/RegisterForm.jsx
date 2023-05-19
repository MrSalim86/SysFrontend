import React, { useState, useEffect } from "react";
import facade from "../apiFacade.js";
import "./RegisterForm.css";

const RegisterForm = ({ user }) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [dataFromServer, setDataFromServer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = user.roles.split(",").includes("user")
          ? "/api/info/create"
          : "/api/create";
        const res = await facade.fetchData(url);
        console.log(res);
        setDataFromServer(res.msg);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Reset form fields
    setFormData(initialState);
  };

  return (
    <div className="container">
      <div className="form-container">
        {dataFromServer}
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username1"
              name="username1"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <br></br>
          <div className="form-row">
            <label htmlFor="password1">Password:</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="center-button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
