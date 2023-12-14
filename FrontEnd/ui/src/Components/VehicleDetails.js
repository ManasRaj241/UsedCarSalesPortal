import React from 'react';
import Navbar from './Navbar';
import 'tailwindcss/tailwind.css';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import VehicleDetailsCard from './VehicleDetailsCard';

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
