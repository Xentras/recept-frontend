import React, { useEffect, useState, useCallback } from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import CustomField from "../Common/CustomField/CustomField.js";
import CustomErrorMessage from "../Common/CustomErrorMessage/CustomErrorMessage.js";
import { Field, FieldArray } from "formik";

function NewSteps(props) {
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const values = props.values;

  const onClick = () => {
    updateButtonState();
  };

  const updateButtonState = useCallback(() => {
    if (values.steps.length !== 1) {
      setButtonsEnabled(true);
    } else if (values.steps.length === 1) {
      setButtonsEnabled(false);
    }
  }, [values.steps.length]);

  useEffect(() => {
    updateButtonState();
  }, [updateButtonState]);

  return (
    <div>
      <FieldArray name="steps">
        {({ remove, push }) => (
          <div>
            <div className="required field" style={{ margin: "0px" }}>
              <label htmlFor="values.steps">
                Steg
                <CustomPopup
                  content="Här skriver man vilken ordning som allt ska göras i, man behöver inte lägga till nummer i början."
                  position="top center"
                />
              </label>
            </div>
            {values.steps.length > 0 &&
              values.steps.map((steps, index) => (
                <div key={index}>
                  <div
                    className="ui fluid action input"
                    key={index}
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                     <Field
                      name={`steps[${index}]`}
                      placeholder="Steg"
                      type="text"
                    />
                    <button
                      type="button"
                      disabled={!buttonsEnabled}
                      className="ui red icon button"
                      onClick={() => {
                        remove(index);
                        onClick();
                      }}
                    >
                      <i className="trash icon"></i>
                    </button>
                  </div>
                  <div>
                    <CustomErrorMessage name={`steps[${index}]`}/>
                  </div>
                </div>
              ))}
            <div>
              <button
                type="button"
                className="positive ui labeled icon button"
                style={{ marginTop: 10 }}
                onClick={() => {
                  push("");
                  onClick();
                }}
              >
                <i className="plus icon" />
                Lägg till steg
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default NewSteps;
