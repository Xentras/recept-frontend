import React from "react";
import CustomField from "../Common/CustomField/CustomField.js"
import {ErrorMessage} from "formik";

function Name(props) {
    return (
      <div className="required field">
        <label htmlFor="values.name">Namn</label>
        <CustomField
          handleBlur={props.handleBlur}
          values={props.values}
          name={`name`}
          placeholder="Namn"
          type="text"
          setFieldValue={props.setFieldValue}
        />
        <span style={{ color: 'red' }}><ErrorMessage name="name" /></span>
      </div>
    );
}

export default Name;