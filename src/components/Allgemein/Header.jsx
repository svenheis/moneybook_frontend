import React from "react";
import "./Header.css";
import Button from "./Button";
import logo from "../../../public/bilder/Logo/logo.png";

class Header extends React.Component {
  handleLogoutButton = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.reload();
    } catch (error) {
      console.error("Fehler beim Ausloggen:", error);
    }
  };
  render() {
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
            onClick={this.handleLogoutButton}
            text="Logout"
          />
        </div>
      </div>
    );
  }
}
export default Header;
