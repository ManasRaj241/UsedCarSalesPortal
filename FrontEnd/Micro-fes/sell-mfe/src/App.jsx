import React from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter"
import "./index.scss";
import Navbar from "./components/Navbar";
import FeaturedVehicles from "./components/FeaturedVehicles";
import Footer from "./components/Footer";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl ">
    <Navbar />
    <FeaturedVehicles />
    <Footer/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
