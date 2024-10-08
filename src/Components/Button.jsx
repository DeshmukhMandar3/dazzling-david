import React from "react";

const Button = ({ text, onButtonClick, customClassname = "" }) => {
  return (
    <div onClick={onButtonClick} className={`button ${customClassname}`}>
      {text}
    </div>
  );
};

export default Button;
