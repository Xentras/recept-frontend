import React from "react";
import { Field } from "formik";

function Dropdown(props) {
  const index = props.index;
  const index2 = props.index2;

  return (
    <Field
      as="select"
      name={`ingredients[${index}].ingredient[${index2}].unit`}
    >
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
    </Field>
  );
}

export default Dropdown;
