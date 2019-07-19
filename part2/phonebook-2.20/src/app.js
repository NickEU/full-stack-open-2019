import React, { useState, useEffect } from "react";
import List from "./components/list";
import Filter from "./components/filter";
import AddItem from "./components/add-item";
import dbServices from "./services/people";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const hook = () => {
    dbServices.getAll().then(data => setPeople(data));
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
    if (people.some(item => item.name === newName)) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }
    const newObj = {
      name: newName,
      number: newNumber.replace(/-+|\s+/g, "-").replace(/^-*(.+?)-*$/g, "$1")
      // played around with regex a bit to delete and/or trim duplicate hyphens
      // and replaced whitespace with hyphens
    };
    dbServices.create(newObj).then(person => setPeople([...people, person]));
    setNewName("");
    setNewNumber("");
  };

  const handleDeleteBtnClick = id => {
    const targetPerson = people.find(person => person.id === id);
    if (window.confirm(`Wanna delete ${targetPerson.name}?`)) {
      dbServices
        .deleteEntry(id)
        .then(() => setPeople(people.filter(person => person.id !== id)));
    }
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

  const filterPeople = () => {
    if (filterValue === "") {
      return people;
    }
    return [...people].filter(
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
      <List list={filterPeople()} onDeleteBtnClick={handleDeleteBtnClick} />
    </div>
  );
};

export default App;
