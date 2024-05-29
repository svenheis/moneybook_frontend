// IMPORTE
// React
import React from "react";
// Komponente
import Titel from "../../components/Allgemein/Ueberschriften";
import Button from "../../components/Allgemein/Button";
// Style
import "../PageStyle.css";

function Start() {
  return (
    <div className="umrandung startPage">
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
