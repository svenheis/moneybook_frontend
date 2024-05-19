import React, { useState, useEffect } from "react";
import "./Header.css";
import Button from "./Button";
import logo from "../../../public/bilder/Logo/logo.png";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/Service";
import { userAnzeigen } from "../../services/Service";

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
        {" "}
        <div>{username}</div>
      </div>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="logoutBtn">
        <Button
          className="standartButtonClass"
          onClick={handleLogoutButton}
          text="Logout"
        />
      </div>
    </div>
  );
};
export default Header;
