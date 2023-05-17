import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home.jsx";
import About from "../routes/About.jsx";
import React from "react";
import Car from "../routes/Car.jsx";
import RegisterForm from "../routes/RegisterForm.jsx";
import Bookings from "../routes/Bookings.jsx";

const Content = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About user={user} />} />
      <Route path="/car" element={<Car user={user} />} />
      <Route path="/RegisterForm" element={<RegisterForm user={user} />} />
      <Route path="/Bookings" element={<Bookings user={user} />} />
    </Routes>
  );
};

export default Content;
