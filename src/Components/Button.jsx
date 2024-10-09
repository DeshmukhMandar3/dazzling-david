import React from "react";
import useSound from "use-sound";
import keyboardTap from "../Sounds/keyboardTap.mp3";

const Button = ({ text, onButtonClick, customClassname = "" }) => {
  const [play] = useSound(keyboardTap);
  return (
    <div
      onClick={() => {
        play();
        onButtonClick();
      }}
      className={`button ${customClassname}`}
    >
      {text}
    </div>
  );
};

export default Button;
