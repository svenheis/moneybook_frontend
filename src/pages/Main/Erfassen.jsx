// IMPORT
// React
import React, { useState } from "react";
// Komponente
import Input from "../../components/Allgemein/Input";
import RadioInput from "../../components/Allgemein/RadioInput";
import Button from "../../components/Allgemein/Button";
import Header from "../../components/Allgemein/Header";
import Titel from "../../components/Allgemein/Ueberschriften";
// Funktionen
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EintragErfassen } from "../../services/Service";
// Style
import "../PageStyle.css";

// SEITE
const Erfassen = () => {
  const [inputs, setInputs] = useState({
    typ: "Einnahme",
    datum: "2024-05-18",
    titel: "A",
    betrag: "1",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const erfassenSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await EintragErfassen(inputs);
      console.log(response.status);
      if (response.status === 201) {
        toast("Eintrag erfolgreich hinzugefügt");
        navigate("/home");
      }
    } catch (error) {
      toast("Eintrag erfassen fehlgeschlagen", error);
    }
  };
  return (
    <div className="umrandung">
      <Header />
      <Titel titel="Eintrag erfassen" />
      <form className="eintragErfassen" onSubmit={erfassenSubmitHandler}>
        <div className="reiheOben">
          <Input
            type="text"
            name="titel"
            placeholder="z.B. Einkaufen"
            value={inputs.titel}
            label="Titel:"
            onChange={handleChange}
            className="Titel"
          />
          <RadioInput
            type="radio"
            name="typ"
            value="Einnahme"
            label="Einnahme"
            checked={inputs.typ === "Einnahme"}
            onChange={handleChange}
            className="eintragRadio eintragEinnahme"
          />
          <RadioInput
            type="radio"
            name="typ"
            value="Ausgabe"
            label="Ausgabe"
            checked={inputs.typ === "Ausgabe"}
            onChange={handleChange}
            className="eintragRadio eintragAusgabe"
          />
        </div>
        <div className="reiheUnten">
          <Input
            type="number"
            name="betrag"
            placeholder="Betrag eingeben"
            value={inputs.betrag}
            label="Betrag:"
            onChange={handleChange}
            className="Betrag"
          />
          <Input
            type="date"
            name="datum"
            placeholder="Datum eingeben"
            value={inputs.datum}
            label="Datum:"
            onChange={handleChange}
            className="Datum"
          />
        </div>
        <div className="letzteErfassenReihe">
          <Button
            className="standartButtonClass logInBtn"
            type="submit"
            text="Erfassen"
            onClick={erfassenSubmitHandler}
          />
        </div>
      </form>
      <div className="footer">
        <Button
          className="standartButtonClass registrierenBtn"
          to={"/home"}
          text="zurück"
        />
      </div>
    </div>
  );
};

// EXPORT
export default Erfassen;
