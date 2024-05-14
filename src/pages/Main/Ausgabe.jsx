import React, { useState, useEffect } from "react";
import Titel from "../../components/Allgemein/Ueberschriften";
import Button from "../../components/Allgemein/Button";
import Header from "../../components/Allgemein/Header";
import Input from "../../components/Allgemein/Input";
import "./Ausgabe.css";
import "../../components/Allgemein/Button.css";
import dayjs from "dayjs";

function Ausgabe() {
  const [eingaenge, setEingaenge] = useState([]);
  const [sortieren, setSortieren] = useState(true);
  const [filterEinnahmen, setFilterEinnahmen] = useState(true);
  const [filterAusgaben, setFilterAusgaben] = useState(true);

  // Alle Einträge ausgeben
  const fetchEingaenge = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/eintrag", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setEingaenge(data.eintrag);
    } catch {
      console.log("Fehler beim Ausgeben der Einträge");
    }
  };

  // Einträge anzeigen

  useEffect(() => {
    fetchEingaenge();
  }, []);

  // Einträge löschen
  const EintragLoeschen = async (id) => {
    try {
      await fetch(`http://localhost:3500/api/eintrag/${id}`, {
        method: "DELETE",
      });
      setEingaenge((prevEingaenge) =>
        prevEingaenge.filter((eintrag) => eintrag._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };
  // Einträge sortieren
  const datenSortieren = (key) => {
    const frischSortieren = { ...sortieren, [key]: !sortieren[key] };
    setSortieren(frischSortieren);

    const sortierteEingaenge = [...eingaenge].sort((a, b) => {
      if (key === "betrag") {
        return frischSortieren.betrag
          ? a.betrag - b.betrag
          : b.betrag - a.betrag;
      } else if (key === "titel") {
        return frischSortieren.titel
          ? a.titel.localeCompare(b.titel)
          : b.titel.localeCompare(a.titel);
      } else if (key === "datum") {
        const dateA = new Date(a.datum.split(".").reverse().join("-"));
        const dateB = new Date(b.datum.split(".").reverse().join("-"));
        return frischSortieren.datum ? dateA - dateB : dateB - dateA;
      } else if (key === "typ") {
        return frischSortieren.typ
          ? a.typ.localeCompare(b.typ)
          : b.typ.localeCompare(a.typ);
      }
      return 0;
    });
    setEingaenge(sortierteEingaenge);
  };
  // Filterfunktionen
  const handleFilterEinnahmen = () => {
    setFilterEinnahmen(true);
    setFilterAusgaben(false);
  };
  const handleFilterAusgaben = () => {
    setFilterEinnahmen(false);
    setFilterAusgaben(true);
  };
  useEffect(() => {
    const checkboxEinnahmen = document.getElementById("checkboxEinnahmen");
    const checkboxAusgaben = document.getElementById("checkboxAusgaben");

    if (checkboxEinnahmen) {
      checkboxEinnahmen.checked = filterEinnahmen;
    }

    if (checkboxAusgaben) {
      checkboxAusgaben.checked = filterAusgaben;
    }
  }, [filterEinnahmen, filterAusgaben]);

  return (
    <div className="umrandung">
      <Header />
      <Titel hLevel={2} titel="Einträge" />
      <table className="ausgabe">
        <thead className="Ausgabeüberschrift">
          <tr className="grosseAusgabeHeadReihe">
            <td className="datumSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("datum")}
                text={<Titel hLevel={5} titel="Datum" />}
              />
            </td>
            <td className="titelSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("titel")}
                text={<Titel hLevel={5} titel="Titel" />}
              />
            </td>
            <td className="betragSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("betrag")}
                text={<Titel hLevel={5} titel="Betrag" />}
              />
            </td>
            <td className="userSpalte betragSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("user")}
                text={<Titel hLevel={5} titel="User" />}
              />
            </td>
            <td className="typSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("typ")}
                text={<Titel hLevel={5} titel="Typ" />}
              />
            </td>
            <td>
              <div className="radio">
                <div
                  className={`filterBoxEinnahmen ${
                    filterEinnahmen ? "active" : ""
                  }`}
                >
                  <Input
                    type="checkbox"
                    label="Einnahmen"
                    id="checkboxEinnahmen"
                    checked={filterEinnahmen}
                    onChange={handleFilterEinnahmen}
                  />
                </div>
                <div
                  className={`filterBoxAusgaben ${
                    filterAusgaben ? "active" : ""
                  }`}
                >
                  <Input
                    type="checkbox"
                    label="Ausgaben"
                    id="checkboxAusgaben"
                    checked={filterAusgaben}
                    onChange={handleFilterAusgaben}
                  />
                </div>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {eingaenge
            .filter(
              (eingang) =>
                (filterEinnahmen && eingang.typ === "Einnahme") ||
                (filterAusgaben && eingang.typ === "Ausgabe")
            )
            .map((eingang, index) => (
              <tr
                className="anzeigeContainer"
                key={index}
                style={{
                  backgroundColor:
                    eingang.typ === "Einnahme" ? "lightgreen" : "lightcoral",
                }}
              >
                <td className="datumSpalte">
                  {dayjs(eingang.datum).format("DD.MM.YYYY")}
                </td>
                <td className="titelSpalte">{eingang.titel}</td>
                <td className="betragSpalte">{eingang.betrag + " Fr."}</td>
                <td className="userSpalte betragSpalte">
                  {eingang.user ? eingang.user.userName : ""}
                </td>
                <td className="typSpalte">{eingang.typ}</td>
                <td className="löschenContainer">
                  <Button
                    onClick={() => EintragLoeschen(eingang._id)}
                    text="Löschen"
                    className="löschenBtn"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="footer">
        <Button
          className="standartButtonClass backBtn"
          to={"/home"}
          text={"zurück"}
        />
      </div>
    </div>
  );
}
export default Ausgabe;
