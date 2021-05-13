import React, { useEffect, useState, useCallback } from "react";
import { Field, FieldArray, ErrorMessage } from "formik";

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
              <label htmlFor="values.steps">Steg</label>
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
                    <span style={{ color: "red" }}>
                      <ErrorMessage name={`steps[${index}]`} />
                    </span>
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
