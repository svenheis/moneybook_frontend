import React from "react";
import "./Header.css";
import Button from "./Button";
import logo from "../../../public/bilder/Logo/logo.png";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/Service";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoutButton = async () => {
    Logout(navigate);
  };

  const cookieData = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username"));

  let username = "";
  if (cookieData) {
    username = cookieData.split("=")[1];
  }

  return (
    <div className="header-div">
      <div className="username">{username && <div>{username}</div>}</div>
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
