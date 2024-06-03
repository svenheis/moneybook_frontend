// IMPORT
// React
import React, { useState, useEffect } from "react";
// dayjs (wird für Datumsanpassung verwendet)
import dayjs from "dayjs";
// Komponente
import Titel from "../../components/Allgemein/Ueberschriften";
import Button from "../../components/Allgemein/Button";
import Header from "../../components/Allgemein/Header";
import RadioInput from "../../components/Allgemein/RadioInput";
// Funktionen
import { eintragAusgabe, EintragLoeschen } from "../../services/Service";
// Style
import "../PageStyle.css";
import toast from "react-hot-toast";

// SEITE
function Ausgabe() {
  const [eingaenge, setEingaenge] = useState([]);
  const [sortieren, setSortieren] = useState(true);
  const [filterTyp, setFilterTyp] = useState("");

  // Alle Einträge ausgeben
  useEffect(() => {
    const fetchData = async () => {
      const data = await eintragAusgabe();
      setEingaenge(data.eintrag);
    };
    fetchData();
  }, []);

  // Einträge löschen
  const handleEintragLoeschen = async (id) => {
    try {
      await EintragLoeschen(id);
      setEingaenge((prevEingaenge) =>
        prevEingaenge.filter((eintrag) => eintrag._id !== id)
      );
      toast.success("Eintrag Gelöscht");
    } catch (error) {
      toast.error("Eintrag konnte nicht gelöscht werden", error);
    }
  };

  // Einträge sortieren
  const datenSortieren = (key) => {
    const frischSortieren = { ...sortieren, [key]: !sortieren[key] };
    setSortieren(frischSortieren);

    const sortierteEingaenge = [...eingaenge].sort((a, b) => {
      // Betrag Sortieren
      if (key === "betrag") {
        return frischSortieren.betrag
          ? a.betrag - b.betrag
          : b.betrag - a.betrag;
        // Titel Sortieren
      } else if (key === "titel") {
        return frischSortieren.titel
          ? a.titel.localeCompare(b.titel)
          : b.titel.localeCompare(a.titel);
        // Datum Sortieren
      } else if (key === "datum") {
        const dateA = dayjs(a.datum, "DD.MM.YYYY").toDate();
        const dateB = dayjs(b.datum, "DD.MM.YYYY").toDate();
        return frischSortieren.datum ? dateA - dateB : dateB - dateA;
        // Typ Sortieren
      } else if (key === "typ") {
        return frischSortieren.typ
          ? a.typ.localeCompare(b.typ)
          : b.typ.localeCompare(a.typ);
        // User Sortieren
      } else if (key === "user") {
        const userA = a.user ? a.user.userName : "";
        const userB = b.user ? b.user.userName : "";
        return frischSortieren.user
          ? userA.localeCompare(userB)
          : userB.localeCompare(userA);
      }
      return 0;
    });
    setEingaenge(sortierteEingaenge);
  };

  // Filterfunktion
  const handleFilterChange = (event) => {
    setFilterTyp(event.target.value);
  };

  return (
    <div className="umrandung">
      <Header />
      <Titel hLevel={2} titel="Einträge" />
      <table className="ausgabe">
        <thead className="Ausgabeüberschrift">
          <tr className="grosseAusgabeHeadReihe">
            <td className="datumHead datumSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("datum")}
                text={<Titel hLevel={5} titel="Datum" />}
              />
            </td>
            <td className="titelHead titelSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("titel")}
                text={<Titel hLevel={5} titel="Titel" />}
              />
            </td>
            <td className="betragHead betragSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("betrag")}
                text={<Titel hLevel={5} titel="Betrag" />}
              />
            </td>
            <td className="userHead userSpalte betragSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("user")}
                text={<Titel hLevel={5} titel="User" />}
              />
            </td>
            <td className="typHead typSpalte">
              <Button
                className="SortBtn"
                onClick={() => datenSortieren("typ")}
                text={<Titel hLevel={5} titel="Typ" />}
              />
            </td>
            <td>
              <div className="radio">
                <RadioInput
                  type="radio"
                  name="filterTyp"
                  value="Einnahme"
                  label="Einnahme"
                  checked={filterTyp === "Einnahme"}
                  onChange={handleFilterChange}
                  className="filterRadio filterRadioEinnahmen"
                />
                <RadioInput
                  type="radio"
                  name="filterTyp"
                  value="Ausgabe"
                  label="Ausgabe"
                  checked={filterTyp === "Ausgabe"}
                  onChange={handleFilterChange}
                  className="filterRadio filterRadioAusgaben"
                />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {eingaenge
            .filter((eingang) => (filterTyp ? eingang.typ === filterTyp : true))
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
                    onClick={() => handleEintragLoeschen(eingang._id)}
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
          className="standartButtonClass registrierenBtn"
          to={"/home"}
          text={"zurück"}
        />
      </div>
    </div>
  );
}

// EXPORT
export default Ausgabe;
