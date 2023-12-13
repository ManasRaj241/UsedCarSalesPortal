import React from 'react';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css';
import Footer from './Footer';
import FeaturedVehicle from './FeaturedVehicle';

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
