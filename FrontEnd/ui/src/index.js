import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SellCar from './Components/SellCar';
import ViewAllCars from './Components/ViewAllCars';
import VehicleDetails from './Components/VehicleDetails';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sellcar',
    element: <SellCar />,
  },
  {
    path: '/viewCars',
    element: <ViewAllCars />,
  },
  {
    path: '/vehicledetails/:vehicleId/:vehicleModelId/:vehicleTypeId',
    element: <VehicleDetails />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
reportWebVitals();
