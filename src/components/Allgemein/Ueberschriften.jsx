// IMPORT
// React
import React from "react";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const Titel = (props) => {
  const { titel, className, hLevel } = props;
  const TitelTag = `h${hLevel || 1}`;
  return (
    <TitelTag className={`standartTitelClass ${className}`}>{titel}</TitelTag>
  );
};

// EXPORT
export default Titel;
