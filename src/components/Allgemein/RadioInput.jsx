// IMPORT
// React
import React from "react";
// Style
import "../ComponentStyle.css";

// KOMPONENTE
const RadioInput = (props) => {
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
    <div className={`standartInputContainer RadioInput ${className}`}>
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
      <label htmlFor={`${name}_${value}`}>{label}</label>
    </div>
  );
};
// EXPORT
export default RadioInput;
