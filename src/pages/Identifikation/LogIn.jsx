import React, { useState } from "react";
import Input from "../../components/Allgemein/Input";
import Button from "../../components/Allgemein/Button";
import Titel from "../../components/Allgemein/Ueberschriften";
import "../PageStyle.css";
import { useNavigate } from "react-router-dom";
import "./identifikation.css";

const LogIn = ({ setEingeloggt }) => {
  // Standartwert eines Inputfeldes
  const [inputs, setInputs] = useState({
    email: "sven@sven.ch",
    password: "12345",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.status);
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; SameSite=Strict; Secure`;
        document.cookie = `username=${data.username}; path=/; SameSite=Strict; Secure`;
        setEingeloggt(true);
        navigate("/home");
      } else {
        alert("Benutzer-Name oder Passwort falsch");
        console.log("error");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  return (
    <div className="umrandung">
      <Titel titel="LogIn" />
      <form onSubmit={loginSubmitHandler}>
        <Input
          type="email"
          name="email"
          label="E-Mail Adresse:"
          placeholder="E-Mail eingeben"
          value={inputs.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Passwort:"
          placeholder="Passwort eingeben"
          value={inputs.password}
          onChange={handleChange}
        />
        <div className="footer">
          <Button
            className="standartButtonClass logInBtn"
            type="submit"
            text="LogIn"
            onClick={loginSubmitHandler}
          />
        </div>
      </form>{" "}
      <div className="logInFooter">
        <Button
          className="standartButtonClass registrierenBtn"
          to={"/register"}
          text="Registrieren"
        />
        <Button
          className="standartButtonClass startBtn"
          to={"/"}
          text="Start"
        />
      </div>
    </div>
  );
};

export default LogIn;
