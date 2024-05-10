import React from "react";
import Titel from "../../components/Allgemein/Ueberschriften";
import Button from "../../components/Allgemein/Button";
import "../Identifikation/identifikation.css";

function Start() {
  return (
    <div className="umrandung">
      <Titel titel="Moneybook" />
      <div className="logInFooter">
        <Button
          className="standartButtonClass logInBtn"
          to={"/login"}
          text="Login"
        />
        <Button
          className="standartButtonClass registrierenBtn"
          to={"/register"}
          text="Registrieren"
        />
      </div>
    </div>
  );
}
export default Start;
