// IMPORTE
// React
import React, { useState } from "react";
// Komponente
import Input from "../../components/Allgemein/Input";
import Button from "../../components/Allgemein/Button";
import Titel from "../../components/Allgemein/Ueberschriften";
// Funktionen
import { useNavigate } from "react-router-dom";
import { UserErfassen } from "../../services/Service";
import { toast } from "react-hot-toast";
// Style
import "../PageStyle.css";

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

    // Alle Angaben Trimmen
    const userName = document.getElementById("userName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Falls leere oder falsche Angaben kommen wird eine Meldung ausgegeben
    if (!userName) {
      toast("Bitte User-Name eingeben");
      return;
    }
    if (!email) {
      toast("Bitte E-Mail Adresse eingeben");
      return;
    }
    // Regex zur Email-Validierung
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast("Bitte korrekte E-Mail Adresse eingeben");
      return;
    }
    if (password.length < 4) {
      toast("Das Passwort muss min. 4 Zeichen haben");
      return;
    }
    try {
      const response = await UserErfassen(inputs);
      console.log(response.status);
      if (response.status === 201) {
        toast("Registration erfolgreich");
        navigate("/login");
      } else {
        toast("Benutzer existiert bereits");
      }
    } catch (error) {
      toast("Registration fehlgeschlagen", error);
    }
  };
  return (
    <div className="umrandung registerPage">
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
