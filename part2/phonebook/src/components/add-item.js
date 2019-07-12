import React from "react";

const AddItem = props => {
  let {
    formSubmit,
    onNameInputChange,
    onNumberInputChange,
    newName,
    newNumber
  } = props;
  return (
    <div id="addItemForm">
      <h4>Add a new entry:</h4>
      <form onSubmit={formSubmit}>
        <div>
          name: <input onChange={onNameInputChange} value={newName} />
        </div>
        <div>
          number: <input onChange={onNumberInputChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
