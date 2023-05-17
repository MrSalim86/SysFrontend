import React, { useState, useEffect } from "react";
import facade from "../apiFacade.js";
import "./RegisterForm.css";

const RegisterForm = ({ user }) => {
  const initialState = {
    city: "",
    zipcode: "",
    street: "",
    streetNumber: "",
    Username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [dataFromServer, setDataFromServer] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = user.roles.split(",").includes("user")
          ? "/api/info/user/register"
          : "/api/register";
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

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form fields
    setFormData(initialState);
  };

  return (
    <div className="container">
      <div className="form-container">
        {dataFromServer}
        <h1>Personal information</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <br></br>
          <div className="form-row">
            <label htmlFor="zipcode">Zipcode:</label>
            <input
              type="number"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <br></br>
          <div className="form-row">
            <label htmlFor="Street">Street:</label>
            <input
              type="text"
              id="Street"
              name="Street"
              value={formData.Street}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <br></br>
          <div className="form-row">
            <label htmlFor="streetnumber">Streetnumber:</label>
            <input
              type="number"
              id="streetnumber"
              name="streetnumber"
              value={formData.streetnumber}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <br></br>
          <br></br>
          <h1>Username and Password</h1>
          <div className="form-row">
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <br></br>
          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
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
