// IMPORT
// React
import React, { useState, useEffect } from "react";
// Seiten
import LogIn from "./pages/Identifikation/LogIn.jsx";
import Register from "./pages/Identifikation/Register.jsx";
import Home from "./pages/Main/Home.jsx";
import Eintrag from "./pages/Main/Erfassen.jsx";
import Start from "./pages/Start/StartSeite.jsx";
import Ausgabe from "./pages/Main/Ausgabe.jsx";
// Funktionen
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [eingeloggt, setEingeloggt] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("username");
    if (token) {
      setEingeloggt(true);
      console.log("Benutzer eingeloggt");
    } else {
      setEingeloggt(false);
      console.log("Benutzer nicht eingeloggt");
    }
  }, []);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={<LogIn setEingeloggt={setEingeloggt} />}
        ></Route>
        <Route
          path="/home"
          element={eingeloggt ? <Home /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/eintrag"
          element={eingeloggt ? <Eintrag /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/ausgabe"
          element={eingeloggt ? <Ausgabe /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </div>
  );
};
export default App;
