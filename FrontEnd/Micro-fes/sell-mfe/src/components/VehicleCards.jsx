import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VehicleCards = () => {
  const [vehicles, setVehicles] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const vehicleResponse = await fetch(
        'https://localhost:7206/api/Vehicles'
      );
      const vehicleData = await vehicleResponse.json();
      setVehicles(vehicleData);

      const modelResponse = await fetch(
        'https://localhost:7206/api/VehicleModels'
      );
      const modelData = await modelResponse.json();
      console.log(modelData);
      setModels(modelData);

      const typeResponse = await fetch(
        'https://localhost:7206/api/VehicleTypes'
      );
      const typeData = await typeResponse.json();
      console.log(typeData);
      setTypes(typeData);
    };

    fetchData();
  }, []);

  const getModelName = (modelId) => {
    const model = models.find((m) => m.id === modelId);
    return model ? model.modelName : '';
  };

  const getTypeName = (typeId) => {
    const type = types.find((t) => t.id === typeId);
    return type ? type.typeName : '';
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-wrap -mx-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.vehicleId}
            className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4"
          >
            <Link
              to={`/VehicleDetails/${vehicle.vehicleId}/${vehicle.vehicleModelId}/${vehicle.vehicleTypeId}`}
            >
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src={`./images/${vehicle.vehicleImage}`}
                  alt={vehicle.vehicleName}
                  className="w-full h-32 object-cover mb-4"
                />
                <div className="text-white">
                  <h1>{vehicle.vehicleName}</h1>
                  <p className="text-sm">
                    {' '}
                    Belongs to : {getModelName(vehicle.vehicleModelId)}
                  </p>
                  <p className="text-sm">
                    Uses : {getTypeName(vehicle.vehicleTypeId)}
                  </p>
                  <p className="text-sm">
                    Distance Travelled: {vehicle.distanceTravelled} Kms
                  </p>
                  <p className="text-sm">Price: ${vehicle.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCards;