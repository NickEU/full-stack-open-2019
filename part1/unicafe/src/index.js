import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Buttons } from "./buttons";
import { Statistics } from "./statistics";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stateHooks = {
    setGood() {
      setGood(good + 1);
    },
    setNeutral() {
      setNeutral(neutral + 1);
    },
    setBad() {
      setBad(bad + 1);
    }
  };

  const handleClick = type => {
    return () => {
      //eval("set" + type)(eval(type.toLowerCase()) + 1);
      stateHooks["set" + type]();
    };
  };

  return (
    <>
      <Buttons handleClick={handleClick} />
      <Statistics stats={[{ good }, { neutral }, { bad }]} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
