import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home';
import reportWebVitals from './reportWebVitals';
import 'tailwindcss/tailwind.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SellCar from './Components/SellCar';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sellcar',
    element: <SellCar />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
reportWebVitals();
