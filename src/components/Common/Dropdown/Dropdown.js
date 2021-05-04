import React from "react";
import { Control } from "react-redux-form";
import { connect } from "react-redux";

function Dropdown(props) {
  const model = props.model;

  return (
    <Control.select model={model} defaultValue="">
      <option value="empty"></option>
      <option value="kg">kg</option>
      <option value="hg">hg</option>
      <option value="g">g</option>
      <option value="l">l</option>
      <option value="dl">dl</option>
      <option value="cl">cl</option>
      <option value="ml">ml</option>
      <option value="msk">msk</option>
      <option value="tsk">tsk</option>
      <option value="krm">krm</option>
    </Control.select>
  );
}

export default connect((s) => s)(Dropdown);
