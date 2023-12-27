import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Home from './components/Home';
import ViewAllCars from './components/ViewAllCars';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SellCar from './components/SellCar';
import VehicleDetails from './components/VehicleDetails';
import CouponDetails from './components/CouponDetails';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CartPage from './components/CartPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/Signup',
    element: <SignupPage />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/viewCars',
    element: <ViewAllCars />,
  },
  {
    path: '/sellcar',
    element: <SellCar />,
  },
  {
    path: '/vehicledetails/:vehicleId/:vehicleModelId/:vehicleTypeId',
    element: <VehicleDetails />,
  },
  {
    path: '/coupons',
    element: <CouponDetails />,
  },
  {
    path: '/cart/:sub',
    element: <CartPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<RouterProvider router={appRouter} />);
