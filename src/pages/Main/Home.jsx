// IMPORTE
// React
import React from "react";
// Komponente
import Button from "../../components/Allgemein/Button";
import Header from "../../components/Allgemein/Header";
import Titel from "../../components/Allgemein/Ueberschriften";
import Bilanz from "../../components/Main/Bilanz";
import KurzBericht from "../../components/Main/KurzBericht";
// Bilder
import hinzufuegen from "../../../public/bilder/Hinzufügen/eintragHinzufugen.png";
// Style
import "../PageStyle.css";

// SEITE
function Home() {
  return (
    <div className="umrandung">
      <Header />
      <div className="EintragBilanzAusgabe">
        <div className="bilanz">
          <Titel hLevel={3} titel="Gesamt-Bilanz" />
          <Bilanz />
        </div>
        <div className="eintragHinzufuegen">
          <Titel hLevel={3} titel="Eintrag Hinzufügen" />
          <Button
            className="standartButtonClass hinzufügenBtn"
            to={"/eintrag"}
            imgSrc={hinzufuegen}
            altText="Hinzufügen"
          />
        </div>
      </div>
      <div className="kurzbericht">
        <Titel hLevel={3} titel="Einträge" />
        <KurzBericht />
        <Button
          className="standartButtonClass registrierenBtn"
          to={"/ausgabe"}
          text={"mehr Anzeigen"}
        />
      </div>
    </div>
  );
}

// EXPORT
export default Home;
