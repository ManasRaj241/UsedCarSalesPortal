import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const SellCarForm = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [models, setModels] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [vehicleImage, setVehicleImage] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [distanceTravelled, setDistanceTravelled] = useState('');
  const [randomPrice, setRandomPrice] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
    fetch('https://localhost:7206/api/VehicleModels')
      .then((response) => response.json())
      .then((data) => {
        const modelOptions = data.map((item) => item);
        setModels(modelOptions);
      });

    fetch('https://localhost:7206/api/VehicleTypes')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const typeOptions = data.map((item) => item);
        setVehicleTypes(typeOptions);
      })
      .catch((error) => console.error('Error fetching vehicle types:', error));
  }, []);

  const handleCalculatePrice = () => {
    const generatedPrice = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
    setRandomPrice(generatedPrice);
  };

  const handleSellCar = () => {
    const postData = {
      VehicleUniqueId: generateUniqueId(),
      VehicleName: vehicleName,
      VehicleModelId: getSelectedModelId(models, selectedModel),
      VehicleStatusId: 1,
      VehicleTypeId: getSelectedTypeId(vehicleTypes, selectedType),
      Price: randomPrice,
      VehicleImage: vehicleImage,
      SellerName: sellerName,
      DistanceTravelled: parseInt(distanceTravelled, 10),
    };

    console.log(JSON.stringify(postData));

    fetch('https://localhost:7206/api/Vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessPopup(true);
        } else {
          setErrorPopup(true);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error selling car:', error);
        setErrorPopup(true);
      });
  };

  const resetForm = () => {
    setVehicleName('');
    setModels([]);
    setVehicleTypes([]);
    setSelectedModel('');
    setSelectedType('');
    setVehicleImage('');
    setSellerName('');
    setDistanceTravelled('');
    setRandomPrice(null);
    setErrorPopup(false);
  };

  const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const getSelectedModelId = (options, selectedOption) => {
    const selectedModel = options.find(
      (item) => item.modelName === selectedOption
    );
    return selectedModel ? selectedModel.id : null;
  };

  const getSelectedTypeId = (options, selectedOption) => {
    const selectedModel = options.find(
      (item) => item.typeName === selectedOption
    );
    return selectedModel ? selectedModel.id : null;
  };

  const closeSuccessPopup = () => {
    resetForm();
    setSuccessPopup(false);
  };

  const closeErrorPopup = () => {
    resetForm();
    setErrorPopup(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Sell Your Car</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Enter Vehicle Name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Model</label>
          <select
            className="mt-1 p-2 w-full border rounded"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="" disabled>
              Select Model
            </option>
            {models.map((model, index) => (
              <option key={index} value={model.modelname}>
                {model.modelName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Vehicle Type</label>
          <select
            className="mt-1 p-2 w-full border rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            {vehicleTypes.map((type, index) => (
              <option key={index} value={type.typeName}>
                {type.typeName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Vehicle Image</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={vehicleImage}
            onChange={(e) => setVehicleImage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Seller Name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Distance Travelled</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={distanceTravelled}
            onChange={(e) => setDistanceTravelled(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Calculate Price</label>
          {randomPrice ? (
            <p className="mt-1 p-2 border rounded bg-gray-200">{`$${randomPrice}`}</p>
          ) : (
            <button
              type="button"
              className="mt-1 p-2 bg-blue-500 text-white rounded"
              onClick={handleCalculatePrice}
            >
              Calculate Price
            </button>
          )}
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="p-2 bg-green-500 text-white rounded"
            onClick={handleSellCar}
          >
            Sell Car
          </button>
        </div>
      </form>
      <Modal
        isOpen={successPopup}
        contentLabel="Success Popup"
        onRequestClose={closeSuccessPopup}
        className="flex w-8/12 h-1/2 p-64 mt-36 ml-72 border-green-100 overflow-hidden shadow-md bg-black"
      >
        <div className="modal-content">
          <p className="text-green-500 text-2xl font-semibold mb-4">
            Your Car has been posted for sale
          </p>
          <Link to="/">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={closeSuccessPopup}
            >
              Close
            </button>
          </Link>
        </div>
      </Modal>

      <Modal
        isOpen={errorPopup}
        contentLabel="Error Popup"
        onRequestClose={closeErrorPopup}
        className="flex w-8/12 h-1/2 p-64 mt-36 ml-72 border-red-100 overflow-hidden bg-black items-center"
      >
        <div>
          <p className="text-red-500 text-2xl font-semibold mb-4">
            Unable to post your car. Please check the entered values.
          </p>
          <button
            className="flex bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300 items-center"
            onClick={closeErrorPopup}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SellCarForm;
