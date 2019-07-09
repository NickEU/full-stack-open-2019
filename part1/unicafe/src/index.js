import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ onClick, text }) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

const StatsDisplay = ({ stats }) => {
  return (
    <div className="stat">
      <h3>Statistics</h3>
      {stats.map(item => {
        let [key, value] = Object.entries(item)[0];
        return <div key={key}>{`${key} ${value}`}</div>;
      })}
    </div>
  );
};

const FeedbackControls = ({ handleClick }) => {
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
      <FeedbackControls handleClick={handleClick} />
      <StatsDisplay stats={[{ good }, { neutral }, { bad }]} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
