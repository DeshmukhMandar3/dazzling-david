import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showButton1, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(true);

  useEffect(() => {
    localStorage.setItem("Player_1", player1);
    localStorage.setItem("Player_2", player2);
  }, [player1, player2]);

  return (
    <div className="welcome">
      <div>
        <div className="welcome-title">
          <div>TIC</div>
          <div>TAC</div>
          <div>TOE</div>
        </div>
        <div className="welcome-buttons-container">
          {showButton1 ? (
            <Button
              text={player1 ? player1 : "Player 1"}
              onButtonClick={() => {
                setShowButton1(false);
                setShowButton2(true);
              }}
            />
          ) : (
            <Input
              value={player1}
              onChange={setPlayer1}
              onClose={() => setShowButton1(true)}
            />
          )}
          {showButton2 ? (
            <Button
              text={player2 ? player2 : "Player 2"}
              onButtonClick={() => {
                setShowButton2(false);
                setShowButton1(true);
              }}
            />
          ) : (
            <Input
              value={player2}
              onChange={setPlayer2}
              onClose={() => setShowButton2(true)}
            />
          )}
        </div>
        <Button
          text={"Lets Play!"}
          onButtonClick={() => navigate("/game")}
          customClassname="welcome-play-button"
        />
      </div>
    </div>
  );
};

export default Welcome;
