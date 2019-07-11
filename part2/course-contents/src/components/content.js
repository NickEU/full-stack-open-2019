import React from "react";
import Part from "./part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((item, id) => (
        <Part part={item.name} exercises={item.exercises} key={item.id} />
      ))}
    </>
  );
};

export default Content;
