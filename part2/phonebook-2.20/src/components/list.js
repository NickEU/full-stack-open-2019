import React from "react";
import ListItem from "./list-item";

const List = ({ list, onDeleteBtnClick }) => {
  const itemsToRender = list.map(item => (
    <ListItem key={item.name} name={item.name} number={item.number}>
      <button className="delete-btn" onClick={() => onDeleteBtnClick(item.id)}>
        delete
      </button>
    </ListItem>
  ));
  return (
    <div id="listContainer">
      <h2>Numbers</h2>
      <ul id="list">{itemsToRender}</ul>
    </div>
  );
};

export default List;
