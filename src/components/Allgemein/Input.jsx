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
    label,
    className,
    onClick,
  } = props;

  return (
    <div className={`standartInputContainer ${className}`}>
      <label htmlFor={`${name}_${value}`}>{label}</label>
      <input
        className={`standartInputClass`}
        name={name}
        type={type}
        value={value}
        id={`${name}_${value}`}
        onChange={onChange}
        placeholder={placeholder}
        onClick={onClick}
      />
    </div>
  );
};

// EXPORT
export default Input;
