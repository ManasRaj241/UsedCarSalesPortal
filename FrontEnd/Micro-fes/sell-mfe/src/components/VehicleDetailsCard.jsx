import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const VehicleDetailsCard = (props) => {
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [typeDetails, setTypeDetails] = useState({});
  const [modelDetails, setModelDetails] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [sub, setSub] = useState('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleResponse = await fetch(
          `https://localhost:7206/api/Vehicles/${props.vehicleId}`
        );
        const vehicleData = await vehicleResponse.json();
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

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const [, payloadBase64] = token.split('.');
        const normalizedPayloadBase64 = payloadBase64
          .replace(/-/g, '+')
          .replace(/_/g, '/');
        const decodedPayloadString = atob(normalizedPayloadBase64);
        const decodedPayloadObject = JSON.parse(decodedPayloadString);
        setDecodedPayload(decodedPayloadObject);
        setSub(decodedPayloadObject.sub);
      } catch (error) {
        console.error('Error decoding JWT token:', error.message);
      }
    }
  }, []);

  const handleAddToCart = async () => {
    try {
      const cartHeader = {
        cartHeaderId: 0,
        userId: sub,
        couponCode: couponCode,
        discount: 0,
        cartTotal: vehicleDetails.price,
      };

      const cartDetails = [
        {
          cartDetailsId: 0,
          cartHeaderId: 0,
          productId: props.vehicleId,
          count: 1,
        },
      ];

      let apiUrl = 'https://localhost:7114/api/cart/Cartupsert';
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartHeader, cartDetails }),
      });

      setIsAddedToCart(true);

      if (couponCode) {
        apiUrl = 'https://localhost:7114/api/cart/ApplyCoupon';
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartHeader, cartDetails }),
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsError(true);
    }
  };

  const closePopup = () => {
    setIsAddedToCart(false);
    setIsError(false);
  };

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
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter the Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-gray-700 p-2 rounded text-white"
            />
            <Link to={`/Cart/${sub}`}>
              <button
                className={`${
                  isAddedToCart
                    ? 'bg-gray-500'
                    : 'bg-green-600 hover:bg-red-500'
                } text-white font-bold py-2 px-4 rounded mt-4 ml-4`}
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? 'Added' : 'Add To Cart'}
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isAddedToCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-green-600 font-semibold">
              Item Added to the Cart
            </p>
            <button
              onClick={closePopup}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-red-600 font-semibold">
              Error while adding to the Cart
            </p>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetailsCard;
