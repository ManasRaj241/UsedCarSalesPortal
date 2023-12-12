import React from 'react';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css';
import Footer from './Footer';
import Featured from './Featured';

const Home = () => {
  return (
    <>
      <Navbar />
      <Featured />
      <Footer />
    </>
  );
};

export default Home;
