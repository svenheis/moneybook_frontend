// IMPORT
// React
import React, { useState, useEffect } from "react";
// Dayjs (wird für Datumsanpassung benötigt)
import dayjs from "dayjs";
// Komponente
import Titel from "../Allgemein/Ueberschriften";
// Funktionen
import { eintragAusgabe } from "../../services/Service";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const KurzBericht = () => {
  const [eingaenge, setEingaenge] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await eintragAusgabe();
      setEingaenge(data.eintrag.slice(0, 3));
    }
    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead className="Ausgabeüberschrift">
          <tr>
            <td className="datum">
              <Titel hLevel={5} titel="Datum:" />
            </td>
            <td className="title">
              <Titel hLevel={5} titel="Titel:" />
            </td>
            <td className="betrag">
              <Titel hLevel={5} titel="Betrag:" />
            </td>
          </tr>
        </thead>
        <tbody>
          {eingaenge.map((eingang, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  eingang.typ === "Einnahme" ? "lightgreen" : "lightcoral",
              }}
            >
              <td className="datum datumSpalte">
                {" "}
                {dayjs(eingang.datum).format("DD.MM.YYYY")}
              </td>
              <td className="titel titelSpalte">{eingang.titel}</td>
              <td className="betrag betragSpalteKlein">
                {eingang.betrag + " Fr."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// EXPORT
export default KurzBericht;
