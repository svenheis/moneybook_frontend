import React from "react";
import "./Ueberschriften.css";

class Titel extends React.Component {
  render() {
    const { titel, className, hLevel } = this.props;
    const TitelTag = `h${hLevel || 1}`;
    return (
      <TitelTag className={`standartTitelClass ${className}`}>{titel}</TitelTag>
    );
  }
}
export default Titel;
