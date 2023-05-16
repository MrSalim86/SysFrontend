import React, { useEffect, useState } from "react";
import apiFacade from "../apiFacade";
import postDataFacade from "../postDataFacade";
import RegisterForm from "./RegisterForm";

const Car = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pris, setPris] = useState("");
  const [year, setYear] = useState("");

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

  const handleSubmit = async event => {
    event.preventDefault();
    const data = { pris, year, car: selectedCar };
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
    <div className="green-background">
      <h1>Car</h1>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div>
          <select onChange={handleSelectCar}>{carOptions}</select>
        </div>
        {selectedCar && (
          <div>
            <h2>
              Make: {selectedCar.make_Name} - Model: {selectedCar.model_Name}
            </h2>
            <p>Make: {selectedCar.make_Name}</p>
            <p>Model: {selectedCar.model_Name}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <span>Pris:</span>
            <input type="text" value={pris} onChange={handlePrisChange} />
          </label>
          <label>
            <span>Year:</span>
            <input type="text" value={year} onChange={handleYearChange} />
          </label>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "lightblue",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Car;
