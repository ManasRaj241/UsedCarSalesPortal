import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedVehicles from "./components/FeaturedVehicles";


export default function MainLayout() {
  return (
    <Router>
      <div className="text-3xl mx-auto max-w-6xl">
        <Navbar />
        <div className="my-10">
          <Switch>
            <Route exact path="/" component={FeaturedVehicles} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}