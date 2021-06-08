import React from "react";

function LoadingSpinner(props) {
  const className = "ui active " + props.size + " centered text inline loader";
  return (
    <div className={className}>{props.text}</div>
  );
}

export default LoadingSpinner;
