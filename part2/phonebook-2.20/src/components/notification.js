import React from "react";

const Notification = props => {
  const { text, isError } = props.error;
  if (text === null) {
    return null;
  }
  const cssClass = isError ? "error" : "success";
  return <div className={cssClass}>{text}</div>;
};

export default Notification;
