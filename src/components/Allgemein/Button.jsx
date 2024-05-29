// IMPORTE
// React
import React from "react";
// Funktionen
import { Link } from "react-router-dom";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const Button = (props) => {
  const { onClick, text, className, type, to, imgSrc, altText } = props;
  return (
    <Link to={to}>
      <button type={type} className={` ${className}`} onClick={onClick}>
        {text}
        <img src={imgSrc} alt={altText} />
      </button>
    </Link>
  );
};
// EXPORT
export default Button;
