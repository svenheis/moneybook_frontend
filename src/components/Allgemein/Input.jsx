// IMPORT
// React
import React from "react";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const Input = (props) => {
  const {
    type,
    value,
    onChange,
    placeholder,
    name,
    id,
    label,
    className,
    onClick,
  } = props;

  return (
    <div className="standartInputContainer">
      <label htmlFor={id}>{label}</label>
      <input
        className={`standartInputClass ${className}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        onClick={onClick}
      />
    </div>
  );
};

// EXPORT
export default Input;
