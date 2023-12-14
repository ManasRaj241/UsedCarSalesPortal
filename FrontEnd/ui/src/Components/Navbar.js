import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="./images/logo.png" alt="Logo" className="w-20 h-20" />
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
          <button className="text-white hover:text-gray-300 hover:bg-orange-600 transition duration-300 p-3">
            View All Vehicles
          </button>
        </Link>
        <button className="text-white hover:text-gray-300 hover:bg-orange-600 transition duration-300 p-3">
          New Arrivals
        </button>
        <Link to="/sellcar">
          <button className="text-white hover:text-gray-300 hover:bg-orange-600 transition duration-300 p-3">
            Sell Your Car
          </button>
        </Link>
        <button className="text-white hover:text-gray-300 hover:bg-orange-600 transition duration-300 p-3">
          About Us
        </button>
        <button className="text-white hover:text-gray-300 hover:bg-orange-600 transition duration-300 p-3">
          Cart
        </button>
        <button className="text-white hover:text-gray-300 hover:bg-orange-600 transition duration-300 p-3">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
