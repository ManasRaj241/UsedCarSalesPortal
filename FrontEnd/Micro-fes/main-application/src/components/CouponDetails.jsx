import React from 'react';
import 'tailwindcss/tailwind.css';

import CouponTable from 'Coupon_MFE/CouponTable';
import Footer from 'sell_mfe/Footer';
import Navbar from 'sell_mfe/Navbar';

const CouponDetails = () => {
  return (
      <>
          <Navbar/>
          <CouponTable />
          <Footer/>
    </>
  );
};

export default CouponDetails;