import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Anecdote = ({ text, voteCount, header }) => {
  return (
    <>
      <h3>{header}</h3>
      <div id="anecdote">{text}</div>
      <div id="votes">Has {voteCount} votes</div>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([]);

  //   useEffect(() => {
  //     setVotes(() =>
  //       [...anecdotes].map((_, id) => (votes[id] > 0 ? votes[id] : 0))
  //     );
  //   }, [anecdotes]);
  // technically the same as below syntax, but eslint gives off a warning.
  const useMountEffect = func => useEffect(func, [anecdotes]);
  // Will only work if anecdotes prop doesn't change or changes by the way of pushing new elements
  // to the end of it. Need a different structure of individual 'anecdotes' in anecdotes array
  // - conversion to an array of objects that each hold a unique ID would probably be a good way to allow
  // deleting anecdotes from the array and keeping the existing vote counts of remaining anecdotes on rerender.
  // Using array indices for this, obviously not great but works for the requirements of this exercise.
  useMountEffect(() => {
    setVotes([...anecdotes].map((_, id) => (votes[id] > 0 ? votes[id] : 0)));
  });

  const getRandomNumber = () => {
    let rndNumber;
    while (true) {
      rndNumber = Math.floor(Math.random() * anecdotes.length);
      if (selected !== rndNumber) {
        return rndNumber;
      }
    }
  };

  const handleClickNext = () => {
    setSelected(getRandomNumber());
  };

  const handleClickVote = () => {
    let newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  let maxVotes = Math.max(...votes);
  let topAnecdoteId = votes.indexOf(maxVotes);

  let topAnecdoteJSX = (
    <>
      <Anecdote
        header={"Anecdote with the most votes"}
        text={anecdotes[topAnecdoteId]}
        voteCount={votes[topAnecdoteId]}
      />
    </>
  );

  return (
    <div id="container">
      <Anecdote
        header={"Anecdote of the day"}
        text={anecdotes[selected]}
        voteCount={votes[selected]}
      />
      <Button text={"vote"} handleClick={handleClickVote} />
      <Button text={"next anecdote"} handleClick={handleClickNext} />
      {maxVotes > 0 ? topAnecdoteJSX : ""}
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
