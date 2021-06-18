import React, { useState } from "react";
import { Field } from "formik";

function CustomField(props) {
  const [text, setText] = useState(props.values || "");

  const RegEx = () => {
    switch(props.placeholder) {
      case "Namn":
        return /[^a-öA-Ö0-9\s`'"]/g;
      case "Mängd":
        return /[^0-9/½]/g
      default:
        return;  
    }
  }

  const onChange = (event) => {
    let text = event.target.value;
    text = text.replace(RegEx(), "");
    setText(text);
  };

  return (
    <Field
      onBlur={(event) => {
        props.setFieldValue(
          event.target.name,
          event.target.value.replace(/\s+/g, " ").trim()
        );
        setText(event.target.value.replace(/\s+/g, " ").trim());
        props.handleBlur(event)
      }}
      onChange={(event) => onChange(event)}
      value={text}
      name={props.name}
      placeholder={props.placeholder}
      as={props.as}
      type={props.type}
    />
  );
}

export default CustomField;
