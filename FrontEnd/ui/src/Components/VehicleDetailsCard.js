import React, { useState, useEffect } from 'react';

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
    <div className="bg-gray-800 text-white p-8 flex">
      <div className="w-1/2">
        <img
          src={`../images/${vehicleDetails.vehicleImage}`}
          alt={vehicleDetails.vehicleName}
          className="w-full h-auto object-cover"
        />
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
      </div>
    </div>
  );
};

export default VehicleDetailsCard;
