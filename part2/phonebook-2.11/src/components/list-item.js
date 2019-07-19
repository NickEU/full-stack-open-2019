import React from "react";

const ListItem = ({ name, number }) => {
  return (
    <li id="listItem">
      {name} {number}
    </li>
  );
};

export default ListItem;
