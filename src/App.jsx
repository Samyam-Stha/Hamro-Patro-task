// import { useState } from "react";
import Home from "./Pages/Homepage/Home";

import "./App.css";
import Second from "./Components/SecondCard/Second";
import Details from "./Pages/DetailsPage/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
