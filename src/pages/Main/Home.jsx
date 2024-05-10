import React from "react";
import Button from "../../components/Allgemein/Button";
import "../PageStyle.css";
import Header from "../../components/Allgemein/Header";
import Titel from "../../components/Allgemein/Ueberschriften";
import Bilanz from "../../components/Main/Bilanz";
import KurzBericht from "../../components/Main/KurzBericht";
import "./Home.css";
import hinzufuegen from "../../../public/bilder/Hinzufügen/eintragHinzufugen.png";

function Home() {
  return (
    <div className="umrandung">
      <Header />
      <div className="EintragBilanzAusgabe">
        <div className="bilanz">
          <Titel hLevel={3} titel="Bilanz" />
          <Bilanz />
        </div>
        <div className="eintragHinzufuegen">
          <Titel hLevel={3} titel="Eintrag Hinzufügen" />
          <Button
            className="standartButtonClass hinzufügenImg"
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
          className="standartButtonClass"
          to={"/ausgabe"}
          text={"mehr Anzeigen"}
        />
      </div>
    </div>
  );
}

export default Home;
