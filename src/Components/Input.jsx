import React from "react";

const Input = ({ value, onChange, onClose }) => {
  return (
    <div className="input-box">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        autoFocus
        onBlur={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClose();
          }
        }}
      />
      <div onClick={onClose}>X</div>
    </div>
  );
};

export default Input;
