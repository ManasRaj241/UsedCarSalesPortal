import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const Cart = () => {
  const { sub } = useParams();
  const [cartData, setCartData] = useState({ cartDetails: [], cartHeader: {} });
  const [modelDetails, setModelDetails] = useState([]);
  const [typeDetails, setTypeDetails] = useState([]);
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [user, setUser] = useState('');
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false);
  const [isPurchaseError, setIsPurchaseError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const cartResponse = await fetch(
          `https://localhost:7009/cart/GetCart/${sub}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const cartData = await cartResponse.json();
        setCartData(cartData.result);
        const modelResponse = await fetch(
          `https://localhost:7009/VehicleModels`
        );
        const modelData = await modelResponse.json();
        setModelDetails(modelData);
        const typeResponse = await fetch(`https://localhost:7009/VehicleTypes`);
        const typeData = await typeResponse.json();
        setTypeDetails(typeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [cartData.cartDetails.length]);

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
        setUser(decodedPayloadObject.email);
      } catch (error) {
        console.error('Error decoding JWT token:', error.message);
      }
    }
  }, []);

  const renderProductDescription = (cartDetail) => (
    <ul>
      <li>
        <h2>{cartDetail.vehicle.vehicleName}</h2>
      </li>
      <li>Distance Travelled: {cartDetail.vehicle.distanceTravelled} miles</li>
      <li>Model: {getModelName(cartDetail.vehicle.vehicleModelId)}</li>
      <li>Type: {getTypeName(cartDetail.vehicle.vehicleTypeId)}</li>
    </ul>
  );

  const getModelName = (modelId) => {
    const model = modelDetails.find((m) => m.id === modelId);
    return model ? model.modelName : '';
  };

  const getTypeName = (typeId) => {
    const type = typeDetails.find((t) => t.id === typeId);
    return type ? type.typeName : '';
  };

  const handleRemoveItem = async (cartDetailsId) => {
    try {
      console.log(cartDetailsId);
      const response = await fetch(`https://localhost:7009/cart/RemoveCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: cartDetailsId,
      });
      if (response.ok) {
        const updatedCartResponse = await fetch(
          `https://localhost:7009/cart/GetCart/${sub}`
        );
        const updatedCartData = await updatedCartResponse.json();
        console.log(updatedCartData);
        if (updatedCartData.message == 'Sequence contains no elements') {
          console.log('Coming here');
          setCartData({ cartDetails: [], cartHeader: {} });
        } else {
          setCartData(updatedCartData.result);
        }
      } else {
        console.error('Failed to remove item from the cart');
      }
    } catch (error) {
      console.error('Error removing item from the cart:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await fetch(
        `https://localhost:7009/cart/BuyVehicleRequest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData),
        }
      );

      if (response.ok) {
        setIsPurchaseSuccess(true);
      } else {
        setIsPurchaseError(true);
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      setIsPurchaseError(true);
    }
  };

  const closePurchasePopup = () => {
    setIsPurchaseSuccess(false);
    setIsPurchaseError(false);
  };

  return (
    <div className="bg-gray-800 p-8 text-white">
      <h1 className="text-3xl font-semibold mb-6">Vehicle Cart</h1>
      {console.log(cartData)}
      {cartData.cartDetails && cartData.cartDetails.length > 0 ? (
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="text-left">SL No</th>
              <th className="text-left">Image</th>
              <th className="text-left">Product Description</th>
              <th className="text-left">Amount</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody className=" bg-gray-400 text-black divide-y divide-black">
            {cartData.cartDetails.map((cartDetail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`/images/${cartDetail.vehicle.vehicleImage}`}
                    alt={cartDetail.vehicle.vehicleName}
                    className="w-16 h-16"
                  />
                </td>
                <td>{renderProductDescription(cartDetail)}</td>
                <td>${cartDetail.vehicle.price}</td>
                <td>
                  <button
                    className="bg-red-500 text-black px-2 py-1 rounded"
                    onClick={() => handleRemoveItem(cartDetail.cartDetailsId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the cart</p>
      )}
      {cartData.cartDetails.length > 0 && (
        <div className="flex justify-end">
          <table className="w-1/2 ml-auto mb-10">
            <tbody className=" bg-gray-400 text-black">
              <tr>
                <td>Total Price</td>
                <td>
                  $
                  {cartData.cartHeader?.cartTotal +
                    cartData.cartHeader?.discount}
                </td>
              </tr>
              <tr>
                <td>Discount Amount</td>
                <td>${cartData.cartHeader?.discount}</td>
              </tr>
              <tr>
                <td>Applied Coupon</td>
                <td>{cartData.cartHeader?.couponCode}</td>
              </tr>
              <tr>
                <td>
                  <b>Final Amount</b>
                </td>
                <td>
                  <b>${cartData.cartHeader?.cartTotal}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {cartData.cartDetails.length > 0 && (
        <div>
          <button
            className="bg-green-600 hover:bg-red-500 w-32 flex p-3 m-auto"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      )}

      {isPurchaseSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-green-600 font-semibold">
              You have successfully purchased the vehicle
            </p>
            <button
              onClick={closePurchasePopup}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isPurchaseError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-red-600 font-semibold">
              Error while purchasing the vehicle
            </p>
            <button
              onClick={closePurchasePopup}
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

export default Cart;
