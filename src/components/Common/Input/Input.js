import React from "react";
import { Control } from "react-redux-form";
import { connect } from "react-redux";

function Input(props) {
  const model = props.model;
  const placeholder = props.placeholder;
  
  return <Control.input model={model} placeholder={placeholder} defaultValue="" />;
}

export default connect((s) => s)(Input);
