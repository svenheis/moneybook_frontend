import React, { useState, useEffect } from "react";
import "./Bilanz.css";
import { BilanzAusgabe } from "../../services/Service";

const Bilanz = () => {
  const [einnahmen, setEinnahmen] = useState([]);
  const [ausgaben, setAusgaben] = useState([]);

  useEffect(() => {
    const fetchBilanz = async () => {
      try {
        const { einnahmen, ausgaben } = await BilanzAusgabe();
        setEinnahmen(einnahmen);
        setAusgaben(ausgaben);
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      }
    };

    fetchBilanz();
  }, []);

  const gesamtEinnahmen = einnahmen.reduce((acc, curr) => acc + curr.betrag, 0);
  const gesamtAusgaben = ausgaben.reduce((acc, curr) => acc + curr.betrag, 0);
  const gesamtBilanz = gesamtEinnahmen - gesamtAusgaben;
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

export default Bilanz;
