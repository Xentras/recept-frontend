import React from "react";
import CustomField from "../Common/CustomField/CustomField.js"
import { Field, ErrorMessage } from "formik";

function Name(props) {
    return (
      <div className="required field">
        <label htmlFor="values.name">Namn</label>
        <Field name={`name`} placeholder="Namn" type="text" />
        <span style={{ color: 'red' }}><ErrorMessage name="name" /></span>
      </div>
    );
}

export default Name;