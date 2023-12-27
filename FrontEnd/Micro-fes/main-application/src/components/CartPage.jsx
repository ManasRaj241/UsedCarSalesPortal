import React from 'react';
import Navbar from 'sell_mfe/Navbar';
import 'tailwindcss/tailwind.css';
import Footer from 'sell_mfe/Footer';
import CartComp from 'cart_MFE/CartComp';

const CartPage = () => {
  return (
    <>
      <Navbar />
      <CartComp />
      <Footer />
    </>
  );
};

export default CartPage;
