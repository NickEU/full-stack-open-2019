import React, { useState } from "react";
import ReactDOM from "react-dom";

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   // implemented currying. The first function call of handleClick(0) is used to "configure"
//   // the second function, by defining some of its parameters. We end up with () => setCounter(0)
//   // which can later be executed by a second call of handleClick(0)
//   // without this react is stuck in infinite loop trying to call handleClick(0)
//   const handleClick = newValue => () => setCounter(newValue);

//   return (
//     <>
//       <Display counter={counter} />
//       <Button onClick={handleClick(counter + 1)} name="Inc" />
//       <Button onClick={handleClick(counter - 1)} name="Dec" />
//       <Button onClick={handleClick(0)} name="Reset" />
//     </>
//   );
// };

// const Display = ({ counter }) => {
//   return <div>{counter}</div>;
// };

// const Button = ({ name, onClick }) => {
//   return <button onClick={onClick}>{name}</button>;
// };

// a more useful example of currying:

// const App = (props) => {
//   const [value, setValue] = useState(10)
//      // The hello function that creates the event handlers
//      // can be thought of as a factory that produces customized
//      // event handlers meant for greeting users.
//   const hello = (who) => {
//     const handler = () => {
//       console.log('hello', who)
//     }
//     return handler
//   }
//   return (
//     <div>
//       {value}
//       <button onClick={hello('world')}>button</button>
//       <button onClick={hello('react')}>button</button>
//       <button onClick={hello('function')}>button</button>
//     </div>
//   )
// }

const History = props => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = props => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setLeft(left + 1);
    setAll(allClicks.concat("L"));
    console.log(allClicks);
  };

  const handleRightClick = () => {
    setRight(right + 1);
    setAll(allClicks.concat("R"));
  };

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left" />
        <Button onClick={handleRightClick} text="right" />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
