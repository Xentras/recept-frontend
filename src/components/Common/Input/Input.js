import React from "react";
import { Field } from "formik";

function Input(props) {
  const name = props.name;
  const placeholder = props.placeholder;
  const type = props.type;

  return (
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Input;