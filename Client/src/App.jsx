import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Navbar,
  Hero,
  Footer,
  FeaturedInvestments,
  PopularInvestments,
  Newslettor,
  Sign_Up,
  Sign_In,
  Investments,
  InvestmentDetail,
} from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <PopularInvestments />
              <FeaturedInvestments />
              <Newslettor />
              <Footer />
            </>
          }
        />

        <Route
          path="/properties"
          element={
            <>
              <Navbar />
              <Investments />
              <Footer />
            </>
          }
        />

        <Route
          path="/investmentDetail/:id"
          element={
            <>
              <Navbar />
              <InvestmentDetail />
              <Footer />
            </>
          }
        />

        <Route path="/signup" element={<Sign_Up />} />

        <Route path="/signin" element={<Sign_In />} />
      </Routes>
    </>
  );
};

export default App;
