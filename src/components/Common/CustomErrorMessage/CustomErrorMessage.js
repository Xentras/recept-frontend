import React from "react";
import { ErrorMessage } from "formik";

function CustomErrorMessage(props) {
  const name = props.name;

  return (
    <span style={{ color: "red" }}>
      <ErrorMessage name={name} />
    </span>
  );
}

export default CustomErrorMessage;
