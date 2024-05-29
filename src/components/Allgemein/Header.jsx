// IMPORTE
// React
import React, { useState, useEffect } from "react";
// Komponente
import Button from "./Button";
// Funktionen
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/Service";
import { userAnzeigen } from "../../services/Service";
// Bilder
import logo from "../../../public/bilder/Logo/logo.png";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userHeaderAnzeige = async () => {
      try {
        const username = await userAnzeigen();
        setUsername(username);
      } catch (error) {
        console.error("Fehler beim Abrufen des Benutzernamens:", error);
      }
    };
    userHeaderAnzeige();
  }, []);

  const handleLogoutButton = async () => {
    Logout(navigate);
  };

  return (
    <div className="header-div">
      <div className="username">
        <div>{username}</div>
      </div>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="logout">
        <Button
          className="standartButtonClass startBtn"
          onClick={handleLogoutButton}
          text="Logout"
        />
      </div>
    </div>
  );
};
// EXPORT
export default Header;
