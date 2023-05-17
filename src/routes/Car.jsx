import React, { useEffect, useState } from "react";
import apiFacade from "../apiFacade";
import postDataFacade from "../postDataFacade";
import RegisterForm from "./RegisterForm";
import "./Car.css";

const Car = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pris, setPris] = useState("");
  const [year, setYear] = useState("");
  const [username, setUsername] = useState("");

  const handleSelectCar = event => {
    const selectedCarId = event.target.value;
    const selectedCar = cars.find(car => car.id === selectedCarId);
    setSelectedCar(selectedCar);
  };

  const handlePrisChange = event => {
    setPris(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = { pris, year, username, car: selectedCar };
    try {
      const res = await postDataFacade.postData("/api/order", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      const url = user.roles.split(",").includes("user")
        ? "/api/car/user"
        : "/api/car";
      const res = await apiFacade.fetchData(url);
      setCars(res);
    };
    fetchCars();
  }, [user]);

  const carOptions = cars.map(car => {
    const makeModelString = `${car.make_Name} - ${car.model_Name}`;
    return (
      <option key={car.id} value={car.id}>
        {makeModelString}
      </option>
    );
  });

  carOptions.unshift(
    <option key="default" value="">
      Select a car
    </option>
  );

  return (
    <div className="form-container">
      <h1>Choose Car</h1>
      <div className="frame-content">
        <div>
          <select onChange={handleSelectCar}>{carOptions}</select>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="pris" className="form-label">
              Pris:
            </label>
            <input
              type="text"
              id="pris"
              className="form-input"
              value={pris}
              onChange={handlePrisChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <input
              type="text"
              id="year"
              className="form-input"
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <br />
          <div className="center-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Car;
