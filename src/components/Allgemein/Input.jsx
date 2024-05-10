import React from "react";
import "./Input.css";

class Input extends React.Component {
  render() {
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
    } = this.props;

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
  }
}

export default Input;
