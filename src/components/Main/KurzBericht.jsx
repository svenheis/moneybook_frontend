import React from "react";
import Titel from "../Allgemein/Ueberschriften";
import "./KurzBericht.css";
import "../../pages/Main/Ausgabe.css";

class KurzBericht extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eingaenge: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3500/api/eintrag", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const eingaenge = data.eintrag.slice(0, 3);
      this.setState({ eingaenge });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { eingaenge } = this.state;
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
                <td className="datum datumSpalte">{eingang.datum}</td>
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
  }
}
export default KurzBericht;
