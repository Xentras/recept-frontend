import React from "react";

const LoadingSpinner = (props) => {
  const className = "ui active " + props.size + " centered text inline loader";
  return <div className={className}>{props.text}</div>;
};

export { LoadingSpinner };
