import React, { useState, useEffect, useCallback } from "react";
import { FieldArray } from "formik";
import { isBrowser, MobileView, BrowserView } from "react-device-detect";
import Portion from "./Portion.js";
import IngredientList from "./IngredientList.js";

function Ingredients(props) {
  const [buttonsEnabledPerson, setButtonsEnabledPerson] = useState(false);
  const values = props.values;

  // This function will run when the user removes a portion/person
  const onPersonClick = () => {
    updateButtonStatePerson();
  };

  // If there are more than 1 person, the button to remove a person should be available
  const updateButtonStatePerson = useCallback(() => {
    // this if/else will update the state everytime a person is added/removed
    if (values.ingredients.length !== 1) {
      setButtonsEnabledPerson(true);
    } else if (values.ingredients.length === 1) {
      setButtonsEnabledPerson(false);
    }
  }, [values.ingredients.length]);

  useEffect(() => {
    updateButtonStatePerson();
  }, [updateButtonStatePerson]);

  return (
    <div className="ui segment">
      <div className="field">
        <label htmlFor="values.ingredients">Ingredienser</label>
      </div>
      <FieldArray name="ingredients">
        {({ remove, push }) => (
          <div>
            {values.ingredients.length > 0 &&
              values.ingredients.map((ingredients, index) => (
                <div className="ui grid" key={index} style={{ marginTop: 5 }}>
                  <div
                    className={
                      isBrowser ? "four wide column" : "twelve wide column"
                    }
                  >
                    <Portion index={index} />
                  </div>
                  <BrowserView>
                    <div className="twelve wide column">
                      <button
                        type="button"
                        disabled={!buttonsEnabledPerson}
                        className="ui labeled red icon button"
                        style={{ marginTop: 25 }}
                        onClick={() => {
                          remove(index);
                          onPersonClick();
                        }}
                      >
                        <i className="trash icon" />
                        Ta bort portion
                      </button>
                      <button
                        type="button"
                        className="ui labeled icon button"
                        style={{ marginTop: 25, marginLeft: 10 }}
                        onClick={() => {
                          push(values.ingredients[index]);
                        }}
                      >
                        <i className="copy outline icon" />
                        Kopiera portion
                      </button>
                    </div>
                    <IngredientList
                      index={index}
                      ingredients={ingredients}
                      values={values}
                    />
                  </BrowserView>
                  <MobileView>
                    <button
                      type="button"
                      disabled={!buttonsEnabledPerson}
                      className="ui labeled red icon button"
                      style={{ width: "45%", marginRight: "5px" }}
                      onClick={() => {
                        remove(index);
                        onPersonClick();
                      }}
                    >
                      <i className="trash icon" />
                      Ta bort portion
                    </button>
                    <button
                      type="button"
                      className="ui labeled icon button"
                      style={{ width: "45%" }}
                      onClick={() => {
                        push(values.ingredients[index]);
                      }}
                    >
                      <i className="copy outline icon" />
                      Kopiera portion
                    </button>
                    <IngredientList
                      index={index}
                      ingredients={ingredients}
                      values={values}
                    />
                  </MobileView>
                </div>
              ))}
            <div className="one column row">
              <div className="three wide column" style={{ marginTop: 10 }}>
                <button
                  type="button"
                  className="primary ui labeled icon button"
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    {
                      push({
                        size: "",
                        ingredient: [
                          {
                            amount: "",
                            unit: "",
                            name: "",
                            subcategory: "",
                          },
                        ],
                      });
                      onPersonClick();
                    }
                  }}
                >
                  <i className="plus icon" />
                  Lägg till portion
                </button>
              </div>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default Ingredients;
