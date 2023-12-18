import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const VehicleDetailsCard = (props) => {
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [typeDetails, setTypeDetails] = useState({});
  const [modelDetails, setModelDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleResponse = await fetch(
          `https://localhost:7206/api/Vehicles/${props.vehicleId}`
        );
        const vehicleData = await vehicleResponse.json();
        console.log(vehicleData);
        setVehicleDetails(vehicleData);

        const typeResponse = await fetch(
          `https://localhost:7206/api/VehicleTypes/${vehicleData.vehicleTypeId}`
        );
        const typeData = await typeResponse.json();
        setTypeDetails(typeData);

        const modelResponse = await fetch(
          `https://localhost:7206/api/VehicleModels/${vehicleData.vehicleModelId}`
        );
        const modelData = await modelResponse.json();
        setModelDetails(modelData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.vehicleId]);

  return (
    <div className="bg-gray-800">
      <div className="bg-gray-800 text-white p-8 flex">
        <div className="w-1/2">
          {vehicleDetails && (
            <img
              src={`/images/${vehicleDetails.vehicleImage}`}
              alt={vehicleDetails.vehicleName}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-3xl font-semibold mb-4">
            {vehicleDetails.vehicleName}
          </h2>
          <p>
            <strong>Model:</strong> {modelDetails.modelName} (
            {modelDetails.modelDescription})
          </p>
          <p>
            <strong>Type:</strong> {typeDetails.typeName} (
            {typeDetails.typeDescription})
          </p>
          <p>
            <strong>Price:</strong> ${vehicleDetails.price}
          </p>
          <p>
            <strong>Distance Travelled:</strong>{' '}
            {vehicleDetails.distanceTravelled} miles
          </p>
          <p>
            <strong>About The car:</strong> A car is a means of transport used
            for traveling from one place to another. This is a four-wheeler used
            by individuals or family members. We all use cars in our daily lives
            to go from one place to another for work. A car is a beautiful
            vehicle that has comfortable seats, AC, and windows. It is basically
            used to reduce travel distance and time. Due to increased automobile
            industries, we see different types of cars ranging from simple to
            the most luxurious ones. Every individual wishes to buy or purchase
            a car which makes their journey a comfortable and enjoyable
            experience. How crazy are people about cars? We have seen kids and
            adults getting fascinated by cars. Isn’t it? Many people dream about
            owning a luxurious car in their life. There are more advanced
            features depending on the price of the car. Nowadays, there are
            extreme features in cars that can blow your mind. Some of the
            interesting features of a car include a sunroof, safety belts,
            airbags, GPS, etc to provide safety to the passengers. These
            features enhance their driving experience for the better. In this
            essay on cars, let us check out some of the important features and
            benefits of a car in our day-to-day lives.{' '}
          </p>
          <Link to="/">
            <button className="bg-orange-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
              Add To Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsCard;