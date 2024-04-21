import React, { useState, Suspense } from "react";
import { Puff } from "react-loader-spinner";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Navbar = React.lazy(() => import("./components/Navbar"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const NoPageFound = React.lazy(() => import("./components/NoPageFound"));
const Protected = React.lazy(() => import("./Routes/Protected"));
const Payment = React.lazy(() => import("./components/Payment"));
const SignIn = React.lazy(() => import("./components/SignIn"));
const LogIn = React.lazy(() => import("./components/LogIn"));
const RestaurantInfo = React.lazy(() => import("./components/RestaurantInfo"));

const Restaurant = React.lazy(() => import("./components/Restaurant"));

function App() {

  return (
    <>
      <Router>
        <Suspense
          fallback={
            <Puff
              height={80}
              width={80}
              color="green"
              ariaLabel="loading"
              wrapperClass="Loader"
            />
          }
        >
         
          <Routes>
            <Route path="/rest">
              <Route path=":id" element={<RestaurantInfo/>} />
            </Route>
            <Route path="/dashboard" element={<Restaurant />} />

            <Route path="/login" element={<Protected Component={LogIn} />} />
            <Route path="/signin" element={<Protected Component={SignIn} />} />
            {/* <Route path="/signin" element={<SignIn />} /> */}
            <Route path="/payment" element={<Payment />} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
// There is a Comment For shield
