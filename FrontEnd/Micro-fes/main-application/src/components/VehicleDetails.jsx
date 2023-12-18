import React from 'react';
import Navbar from 'sell_mfe/Navbar';
import 'tailwindcss/tailwind.css';
import Footer from 'sell_mfe/Footer';
import { useParams } from 'react-router-dom';
import VehicleDetailsCard from 'sell_mfe/VehicleDetailsCard';

const VehicleDetails = () => {
  const params = useParams();
  return (
    <>
      <Navbar />
      <VehicleDetailsCard
        vehicleId={params.vehicleId}
        vehicleModelId={params.vehicleModelId}
        vehicleTypeId={params.vehicleTypeId}
      />
      <Footer />
    </>
  );
};

export default VehicleDetails;