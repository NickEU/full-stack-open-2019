import React from "react";
import "./buttons.css";

const Button = ({ onClick, text }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

export const Buttons = ({ handleClick }) => {
  return (
    <div id="feedbackDiv">
      <h3>Give feedback</h3>
      <div>
        <Button text="good" onClick={handleClick("Good")} />
        <Button text="neutral" onClick={handleClick("Neutral")} />
        <Button text="bad" onClick={handleClick("Bad")} />
      </div>
    </div>
  );
};
