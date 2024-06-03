// IMPORTE
// React
import React, { useState } from "react";
// Komponente
import Input from "../../components/Allgemein/Input";
import Button from "../../components/Allgemein/Button";
import Titel from "../../components/Allgemein/Ueberschriften";
// Funktionen
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Einloggen } from "../../services/Service";
// Style
import "../PageStyle.css";

const LogIn = ({ setEingeloggt }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  // Aufruf Navigationsfunktion
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const loginSubmitHandler = async (event) => {
    toast.promise("App startet, bitte warten");
    event.preventDefault();
    try {
      const data = await Einloggen(inputs);
      if (data) {
        setEingeloggt(true);
        toast.success("Eingeloggt");
        navigate("/home");
      } else {
        toast.error("Benutzer-Name oder Passwort falsch");
      }
    } catch (error) {
      toast.error("LogIn fehlgeschlagen", error);
    }
  };
  return (
    <div className="umrandung loginPage">
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
        <div className="logInFooter">
          <Button
            className="standartButtonClass logInBtn"
            type="submit"
            text="LogIn"
            onClick={loginSubmitHandler}
          />
        </div>
      </form>{" "}
      <div className="footer">
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
