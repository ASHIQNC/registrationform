import React from "react";
import "./App.css";
import RegistraionForm from "./Component/RegistrationForm/RegistraionForm";
import { Route, Routes } from "react-router-dom";
import Details from "./Component/Details/Details";
import Header from "./Component/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<RegistraionForm />} />
        <Route path="details" element={<Details />}></Route>
      </Routes>
    </div>
  );
}

export default App;
