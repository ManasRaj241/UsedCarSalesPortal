import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Home from "./components/Home";
import ViewAllCars from "./components/ViewAllCars";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SellCar from "./components/SellCar";
import VehicleDetails from "./components/VehicleDetails";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element:<Home/>
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
])

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<RouterProvider router={appRouter} />);
