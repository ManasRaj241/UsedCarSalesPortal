import React from 'react';
import Navbar from 'sell_mfe/Navbar';
import 'tailwindcss/tailwind.css';
import Footer from 'sell_mfe/Footer';
import VehicleCards from 'sell_mfe/VehicleCards';

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