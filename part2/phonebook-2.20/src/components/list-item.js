import React from "react";

const ListItem = ({ name, number, children }) => {
  return (
    <li id="listItem">
      {name} {number} {children}
    </li>
  );
};

export default ListItem;
