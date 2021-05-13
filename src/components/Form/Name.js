import React from "react";
import { Field, ErrorMessage } from "formik";

function NewName() { 
    return (
      <div className="required field">
        <label htmlFor="values.name">Namn</label>
        <Field name={`name`} placeholder="Namn" type="text" />
        <span style={{ color: 'red' }}><ErrorMessage name="name" /></span>
      </div>
    );
}

export default NewName;