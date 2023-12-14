import React from 'react';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css';
import Footer from './Footer';
import VehicleCards from './VehicleCards';
const ViewAllCars = () => {
  return (
    <>
      <Navbar />
      <VehicleCards />
      <Footer />
    </>
  );
};

export default ViewAllCars;
