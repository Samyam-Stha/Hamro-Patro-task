// import { useState } from "react";
import Home from "./Pages/Homepage/Home";

import "./App.css";
import Second from "./Components/SecondCard/Second";
import Details from "./Pages/DetailsPage/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Pages/RecipeForm/Form";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Details />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
