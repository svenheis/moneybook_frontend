import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

class Button extends React.Component {
  render() {
    const { onClick, text, className, type, to, imgSrc, altText } = this.props;
    return (
      <Link to={to}>
        <button type={type} className={` ${className}`} onClick={onClick}>
          {text}
          <img src={imgSrc} alt={altText} />
        </button>
      </Link>
    );
  }
}
export default Button;
