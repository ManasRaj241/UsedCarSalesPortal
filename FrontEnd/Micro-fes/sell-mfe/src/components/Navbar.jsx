import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [user, setUser] = useState('');
  const [sub, setSub] = useState('');

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
        setUser(decodedPayloadObject.role);
        setSub(decodedPayloadObject.sub);
      } catch (error) {
        console.error('Error decoding JWT token:', error.message);
      }
    }
  }, []);

  return (
    <nav className="bg-black p-4 flex justify-between items-center text-base">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="w-20 h-20" />
        </Link>
      </div>
      <div className="flex-grow mx-9">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-600"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/viewCars">
          <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3">
            View All Vehicles
          </button>
        </Link>
        <Link to="/sellcar">
          <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3">
            Sell Your Car
          </button>
        </Link>
        {user === 'ADMIN' ? (
          <Link to="/coupons">
            <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3">
              Manage Coupons
            </button>
          </Link>
        ) : (
          <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3">
            About Us
          </button>
        )}
        <Link to={`/Cart/${sub}`}>
          <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3">
            Cart
          </button>
        </Link>
        <Link to={`/`}>
          <button className="text-white hover:text-gray-300 hover:bg-red-500 transition duration-300 p-3">
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
