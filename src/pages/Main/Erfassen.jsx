import React, { useState } from "react";
import Input from "../../components/Allgemein/Input";
import Button from "../../components/Allgemein/Button";
import Header from "../../components/Allgemein/Header";
import Titel from "../../components/Allgemein/Ueberschriften";
import "../PageStyle.css";
import "./Erfassen.css";
import { useNavigate } from "react-router-dom";

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
    console.log(inputs);
    try {
      const response = await fetch("http://localhost:3500/api/eintrag", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(response.status);
      if (response.status === 201) {
        navigate("/home");
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="umrandung">
      <Header />
      <Titel titel="Eintrag erfassen" />
      <form className="eintragErfassen" onSubmit={erfassenSubmitHandler}>
        <Input
          type="radio"
          name="typ"
          value="Einnahme"
          label="Einnahme:"
          checked={inputs.typ === "Einnahme"}
          onChange={handleChange}
        />
        <Input
          type="radio"
          name="typ"
          value="Ausgabe"
          label="Ausgabe:"
          checked={inputs.typ === "Ausgabe"}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="datum"
          placeholder="Datum eingeben"
          value={inputs.datum}
          label="Datum:"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="titel"
          placeholder="z.B. Einkaufen"
          value={inputs.titel}
          label="Titel:"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="betrag"
          placeholder="Betrag eingeben"
          value={inputs.betrag}
          label="Betrag:"
          onChange={handleChange}
        />
        <div className="letzteErfassenReihe">
          <Button
            className="standartButtonClass erfassenBtn"
            type="submit"
            text="Erfassen"
            onClick={erfassenSubmitHandler}
          />
        </div>
      </form>
      <div className="footer">
        <Button
          className="standartButtonClass zurückBtn"
          to={"/home"}
          text="zurück"
        />
      </div>
    </div>
  );
};
export default Erfassen;
