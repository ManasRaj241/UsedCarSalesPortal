import React from 'react';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css';
import Footer from './Footer';
import SellCarForm from './SellCarForm';

const SellCar = () => {
  return (
    <>
      <Navbar />
      <SellCarForm />
      <Footer />
    </>
  );
};

export default SellCar;
