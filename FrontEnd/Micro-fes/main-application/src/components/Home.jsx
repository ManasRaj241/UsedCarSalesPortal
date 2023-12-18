import React from 'react';
import Navbar from 'sell_mfe/Navbar';
import 'tailwindcss/tailwind.css';
import Footer from 'sell_mfe/Footer';
import FeaturedVehicle from 'sell_mfe/FeaturedVehicles';

const Home = () => {
  return (
    <>
      <Navbar />
      <FeaturedVehicle />
      <Footer />
    </>
  );
};

export default Home;