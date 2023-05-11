import React, { useEffect, useState } from "react";
import facade from "../apiFacade";

const Car = ({ user }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const url = user.roles.split(",").includes("user")
        ? "/api/car/user"
        : "/api/car";
      const res = await facade.fetchData(url);
      setCars(res);
      console.log(res);
    };
    fetchCars();
  }, [user]);

  return (
    <div>
      <h1>Car</h1>
      {cars.map((car, index) => (
        <li key={index}>
          <p>Make: {car.make_Name}</p>
          <p>Model: {car.model_Name}</p>
        </li>
      ))}
    </div>
  );
};

export default Car;
