import React, { useState, useEffect } from 'react';

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7009/FeaturedVehicles');
        const data = await response.json();
        setVehicles(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, vehicles]);

  const vehicle = vehicles[currentIndex];

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="elative p-5 flex bg-black items-center text-base">
      <div className="w-1/2">
        <img
          src={`../images/${vehicle.vehicleImage}`}
          alt={vehicle.vehicleName}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-1/2 p-4">
        <div className="w-1/2 max-w-md mx-auto p-4 border border-gray-300 text-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Car Information</h2>
            <p className="text-white-700">Vehicle: {vehicle.vehicleName}</p>
            <p className="text-white-700">Price: ${vehicle.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicles;
