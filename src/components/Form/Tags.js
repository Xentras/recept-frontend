import React, { useEffect, useState, useCallback } from "react";
import CustomPopup from "../Common/CustomPopup/CustomPopup.js";
import CustomField from "../Common/CustomField/CustomField.js";
import CustomErrorMessage from "../Common/CustomErrorMessage/CustomErrorMessage.js";
import { Field, FieldArray } from "formik";

function NewTags(props) {
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const values = props.values;

  const onClick = () => {
    updateButtonState();
  };

  const updateButtonState = useCallback(() => {
    if (values.tags.length !== 1) {
      setButtonsEnabled(true);
    } else if (values.tags.length === 1) {
      setButtonsEnabled(false);
    }
  }, [values.tags.length]);

  useEffect(() => {
    updateButtonState();
  }, [updateButtonState]);

  return (
    <div>
      <FieldArray name="tags">
        {({ remove, push }) => (
          <div>
            <div className="required field" style={{ margin: "0px" }}>
              <label htmlFor="values.tags">
                Kategori
                <CustomPopup
                  content="Om receptet t.ex. är en tårta, så kan man skriva 'Tårta' eller 'Pasta' om det är en pastarätt"
                  position="top center"
                />
              </label>
            </div>
            {values.tags.length > 0 &&
              values.tags.map((tags, index) => (
                <div key={index}>
                  <div
                    className="ui action input"
                    key={index}
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    <Field
                      name={`tags[${index}]`}
                      placeholder="Kategori"
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
                    <CustomErrorMessage name={`tags[${index}]`} />
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
                Lägg till kategori
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default NewTags;
