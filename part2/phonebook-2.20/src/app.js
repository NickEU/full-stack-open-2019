import React, { useState, useEffect } from "react";
import List from "./components/list";
import Filter from "./components/filter";
import AddItem from "./components/add-item";
import Notification from "./components/notification";
import dbServices from "./services/people";

let timerIDs = [];

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [errorMsg, setErrorMsg] = useState({ text: null });

  const getPeople = () => {
    dbServices.getAll().then(data => setPeople(data));
  };

  useEffect(getPeople, []);

  const updateIfNeeded = trimmedNewName => {
    for (let i = 0; i < people.length; i++) {
      const item = people[i];
      if (item.name === trimmedNewName) {
        const confirm = window.confirm(
          `${trimmedNewName} already exists in the phonebook. Would you like to replace the old number with the new one?`
        );
        if (confirm) {
          dbServices
            .updateEntry({ ...item, number: cleanUpNewNumber() })
            .then(res => {
              setPeople(
                people.map(entry => (entry.id === item.id ? res : entry))
              );
              showNotificationMsg(`Updated info on ${item.name}`, false);
            })
            .catch(err => {
              console.log(err);
              showNotificationMsg(
                `Info on ${item.name} has already been removed from the server`,
                true
              );
              getPeople();
            });
        }
        return true;
      }
    }
    return false;
  };

  const cleanUpNewNumber = () => {
    return newNumber.replace(/-+|\s+/g, "-").replace(/^-*(.+?)-*$/g, "$1");
    // played around with regex a bit to delete and/or trim duplicate hyphens
    // and replaced whitespace with hyphens
  };

  const showNotificationMsg = (msg, isError) => {
    if (timerIDs.length > 0) {
      timerIDs.forEach(id => clearTimeout(id));
      timerIDs = [];
    }
    setErrorMsg({ text: msg, isError });
    timerIDs.push(
      setTimeout(() => {
        setErrorMsg({ text: null });
        timerIDs.shift();
      }, 5000)
    );
  };

  const handleFormSubmit = e => {
    console.log("entered form submit");
    e.preventDefault();
    if (newName === "" || !/^[a-z ]*$/i.test(newName)) {
      alert(`Please enter a valid name`);
      return;
    }

    const trimmedNewName = newName.trim();

    if (newNumber === "" || /[^\d -]/.test(newNumber)) {
      //any string that includes anything
      //that is not a digit, a whitespace or a hypen is not a valid number
      alert(`Please enter a valid phone number`);
      return;
    }

    if (updateIfNeeded(trimmedNewName)) {
      return;
    }

    const newObj = {
      name: trimmedNewName,
      number: cleanUpNewNumber()
    };
    dbServices.create(newObj).then(person => {
      setPeople([...people, person]);
      showNotificationMsg(`Successfully added ${newObj.name}`, false);
    });

    setNewName("");
    setNewNumber("");
  };

  const handleDeleteBtnClick = id => {
    const targetPerson = people.find(person => person.id === id);
    if (window.confirm(`Wanna delete ${targetPerson.name}?`)) {
      dbServices.deleteEntry(id).then(() => {
        setPeople(people.filter(person => person.id !== id));
        showNotificationMsg(`Successfully deleted ${targetPerson.name}`, false);
      });
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
      <Notification error={errorMsg} />
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
