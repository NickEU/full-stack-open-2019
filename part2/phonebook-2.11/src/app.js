import React, { useState, useEffect } from "react";
import List from "./components/list";
import Filter from "./components/filter";
import AddItem from "./components/add-item";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then(response => {
      console.log(response);
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (newName === "" || !/^[a-z ]*$/i.test(newName)) {
      alert(`Please enter a valid name`);
      return;
    }
    if (newNumber === "" || /[^\d -]/.test(newNumber)) {
      //any string that includes anything
      //that is not a digit, a whitespace or a hypen is not a valid number
      alert(`Please enter a valid phone number`);
      return;
    }
    if (persons.some(item => item.name === newName)) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }
    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber.replace(/-+|\s+/g, "-").replace(/^-*(.+?)-*$/g, "$1")
        // played around with regex a bit to delete and/or trim duplicate hyphens
        // and replaced whitespace with hyphens
      }
    ]);
    setNewName("");
    setNewNumber("");
  };

  const handleNameInputChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberInputChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterInputChange = e => {
    setFilterValue(e.target.value);
  };

  const filterPersons = () => {
    if (filterValue === "") {
      return persons;
    }
    return [...persons].filter(
      item => item.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    );
  };

  return (
    <div id="container">
      <h2>Phonebook</h2>
      <AddItem
        formSubmit={handleFormSubmit}
        onNameInputChange={handleNameInputChange}
        onNumberInputChange={handleNumberInputChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Filter onChange={handleFilterInputChange} inputValue={filterValue} />
      <List list={filterPersons()} />
    </div>
  );
};

export default App;
