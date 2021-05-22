import React, { useState, useEffect, useCallback } from "react";
import { FieldArray } from "formik";
import { Popup, Icon } from "semantic-ui-react";
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
                  <div className="four wide column">
                    <Portion index={index} />
                  </div>
                  <div className="twelve wide column">
                    <button
                      type="button"
                      disabled={!buttonsEnabledPerson}
                      className="ui red icon button"
                      style={{ marginTop: 25 }}
                      onClick={() => {
                        remove(index);
                        onPersonClick();
                      }}
                    >
                      <i className="trash icon" />
                      Ta bort person/portion
                    </button>
                  </div>
                  <IngredientList
                    index={index}
                    ingredients={ingredients}
                    values={values}
                  />
                </div>
              ))}
            <div className="one column row">
              <div className="three wide column" style={{ marginTop: 5 }}>
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
                  Lägg till person/portion
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
