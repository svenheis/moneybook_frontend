import React, { useState } from "react";
import Input from "../../components/Allgemein/Input";
import Button from "../../components/Allgemein/Button";
import Titel from "../../components/Allgemein/Ueberschriften";
import "../PageStyle.css";
import { useNavigate } from "react-router-dom";
import { UserErfassen } from "../../services/Service";

const Register = (event) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });
  // Beim verlieren des Fokus beim Eingabefeld wird der Status von Input auf setInput gesetzt
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Funktion zum übergeben der Daten an den Endpunkt
  const registerSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await UserErfassen(inputs);
      console.log(response.status);
      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Schiefgelaufen");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="umrandung">
      <Titel titel="Registrierung" />
      <form className="registerForm" onSubmit={registerSubmitHandler}>
        <Input
          id="userName"
          type="text"
          name="userName"
          placeholder="Benutzername eingeben"
          value={inputs.userName}
          label="Benutzer Name:"
          onChange={handleChange}
        />
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="E-Mail eingeben"
          value={inputs.email}
          label="E-Mail Adresse:"
          onChange={handleChange}
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Passwort eingeben"
          value={inputs.password}
          label="Passwort:"
          onChange={handleChange}
        />
        <div className="footer">
          <Button
            className="standartButtonClass registrierenBtn"
            type="submit"
            text="Registrieren"
            onClick={registerSubmitHandler}
          />
        </div>
      </form>
      <div className="logInFooter">
        <Button
          className="standartButtonClass logInBtn"
          to={"/login"}
          text="zum Login"
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

export default Register;
