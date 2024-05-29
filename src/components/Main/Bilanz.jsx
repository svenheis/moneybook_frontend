// IMPORT
// React
import React, { useState, useEffect } from "react";
// Funktionen
import { BilanzAusgabe } from "../../services/Service";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const Bilanz = () => {
  const [einnahmen, setEinnahmen] = useState([]);
  const [ausgaben, setAusgaben] = useState([]);

  useEffect(() => {
    const fetchBilanz = async () => {
      try {
        const { einnahmen, ausgaben } = await BilanzAusgabe();
        setEinnahmen(einnahmen);
        setAusgaben(ausgaben);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };
    fetchBilanz();
  }, []);

  const gesamtEinnahmen = einnahmen
    .reduce((acc, curr) => acc + curr.betrag, 0)
    .toFixed(2);
  //reduce = wird auf eine Zahl reduziert / acc = kumulierte Wert während des reduzieren / curr = Aktueller Wert des Arrays
  const gesamtAusgaben = ausgaben
    .reduce((acc, curr) => acc + curr.betrag, 0)
    .toFixed(2);
  const gesamtBilanz = (gesamtEinnahmen - gesamtAusgaben).toFixed(2);
  // ist die Gesamt Bilanz unter 0 wird die Zahl rot gefärbt
  const bilanzFarbe = gesamtBilanz < 0 ? "bilanzZahl red" : "bilanzZahl";

  return (
    <>
      <aside className="gesamtBilanzAnzeige">
        <div className="bilanzZeile"></div>
        <div className="bilanzZeile">
          <span className="einnahmenAnzeige">Einnahmen: </span>
          <span className="einnahmenZahl">{gesamtEinnahmen + " Fr."}</span>
        </div>
        <div className="bilanzZeile">
          <span className="ausgabenAnzeige">Ausgaben: </span>
          <span className="ausgabenZahl">{gesamtAusgaben + " Fr."}</span>
        </div>
        <div className="bilanzZeile">
          <span className="bilanzAnzeige">Bilanz: </span>
          <span className={bilanzFarbe}>{gesamtBilanz + " Fr."}</span>
        </div>
      </aside>
    </>
  );
};

// EXPORT
export default Bilanz;
