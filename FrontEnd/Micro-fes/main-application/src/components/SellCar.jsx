import React from 'react';
import Navbar from 'sell_mfe/Navbar';
import 'tailwindcss/tailwind.css';
import Footer from 'sell_mfe/Footer';
import SellCarForm from 'sell_mfe/SellCarForm';

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