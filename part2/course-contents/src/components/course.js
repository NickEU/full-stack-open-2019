import React from "react";
import Content from "./content";
import Header from "./header";
import Total from "./total";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
