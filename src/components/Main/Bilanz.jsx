import React from "react";
import "./Bilanz.css";

class Bilanz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      einnahmen: [],
      ausgaben: [],
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3500/api/eintrag", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const eingaenge = data.eintrag;
      const einnahmen = eingaenge.filter(
        (eintrag) => eintrag.typ === "Einnahme"
      );
      const ausgaben = eingaenge.filter((eintrag) => eintrag.typ === "Ausgabe");

      this.setState({ einnahmen, ausgaben });
    } catch (err) {
      console.error("Fehler beim Laden der Daten:", err);
    }
  }

  render() {
    const { einnahmen, ausgaben } = this.state;
    const gesamtEinnahmen = einnahmen.reduce(
      (acc, curr) => acc + curr.betrag,
      0
    );
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
  }
}

export default Bilanz;
