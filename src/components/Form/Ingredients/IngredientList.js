import React, { useState, useEffect, useCallback } from "react";
import { FieldArray } from "formik";
import Dropdown from "../../Common/Dropdown/Dropdown.js";
import CustomErrorMessage from "../../Common/CustomErrorMessage/CustomErrorMessage.js";
import CustomField from "../../Common/CustomField/CustomField.js";
import CustomPopup from "../../Common/CustomPopup/CustomPopup.js";
import Input from "../../Common/Input/Input.js";

function IngredientList(props) {
  const [buttonsEnabledIngredient, setButtonsEnabledIngredient] = useState([
    false,
  ]);
  const index = props.index;
  const ingredients = props.ingredients;
  const values = props.values;

  // This function will run when the user adds a new ingredient
  const onIngredientClick = () => {
    updateButtonStateIngredients();
  };

  // If there are more than 1 ingredient, the button to remove a ingredient should be available
  const updateButtonStateIngredients = useCallback(() => {
    if (values.ingredients.length !== buttonsEnabledIngredient.length) {
      updateOnLoad();
    } else if (values.ingredients.length === buttonsEnabledIngredient.length) {
      let newArr = [...buttonsEnabledIngredient]; // copying the buttonsEnabledIngredient array
      // this will update the state everytime a ingredient is added/removed
      for (var i = 0; i < values.ingredients.length; i++) {
        if (values.ingredients[i].ingredient.length !== 1) {
          newArr[i] = true;
        } else if (values.ingredients[i].ingredient.length === 1) {
          newArr[i] = false;
        }
      }
      setButtonsEnabledIngredient(newArr);
    }
  }, [values.ingredients]);

  // This function is used when the ingredientlist and buttonsEnabledIngredient are not the same length
  // this happens when loading a recipe when the user is editing a recipe
  // it will make sure that the button state for remove ingredients buttons are correct
  const updateOnLoad = () => {
    let newArr = buttonsEnabledIngredient; // copying the buttonsEnabledIngredient array
    // this if/else will update the state everytime a ingredient is added/removed
    for (var i = 0; i < values.ingredients.length; i++) {
      if (values.ingredients[i].ingredient.length !== 1) {
        newArr[i] = true;
      } else if (values.ingredients[i].ingredient.length === 1) {
        newArr[i] = false;
      }
    }
    setButtonsEnabledIngredient(newArr);
  };

  useEffect(() => {
    updateButtonStateIngredients();
  }, [updateButtonStateIngredients]);

  return (
    <FieldArray name={`ingredients[${index}].ingredient`}>
      {({ remove, push }) => (
        <div className="ui grid" style={{ marginTop: 5 }}>
          {ingredients.ingredient.length > 0 &&
            ingredients.ingredient.map((ingredient, index2) => (
              <div className="ui grid" key={index2} style={{ marginTop: "0px" }}>
                <div className="two wide column">
                  <div className="required field" style={{ margin: "0px" }}>
                    <label
                      htmlFor={`ingredients[${index}].ingredient[${index2}].amount`}
                    >
                      Mängd
                    </label>
                  </div>
                  <Input
                    name={`ingredients[${index}].ingredient[${index2}].amount`}
                    type="text"
                    placeholder="Mängd"
                  />
                  <CustomErrorMessage
                    name={`ingredients[${index}].ingredient[${index2}].amount`}
                  />
                </div>
                <div className="two wide column">
                  <div className="field" style={{ margin: "0px" }}>
                    <label
                      htmlFor={`ingredients[${index}].ingredient[${index2}].unit`}
                    >
                      Enhet
                    </label>
                  </div>
                  <Dropdown index={index} index2={index2} />
                </div>
                <div className="four wide column">
                  <div className="required field" style={{ margin: "0px" }}>
                    <label
                      htmlFor={`ingredients[${index}].ingredient[${index2}].name`}
                    >
                      Ingrediens
                    </label>
                  </div>
                  <Input
                    name={`ingredients[${index}].ingredient[${index2}].name`}
                    type="text"
                    placeholder="Ingrediens"
                  />
                  <CustomErrorMessage
                    name={`ingredients[${index}].ingredient[${index2}].name`}
                  />
                </div>
                <div className="four wide column">
                  <div className="field" style={{ margin: "0px" }}>
                    <label
                      htmlFor={`ingredients[${index}].ingredient[${index2}].subcategory`}
                    >
                      Kategori
                      <CustomPopup
                        content="Här kan man t.ex. skriva 'Deg' om samma ingrediensen kommer användas till andra saker."
                        position="top center"
                      />
                    </label>
                  </div>
                  <Input
                    name={`ingredients[${index}].ingredient[${index2}].subcategory`}
                    type="text"
                    placeholder="Kategori"
                  />
                  <CustomErrorMessage
                    name={`ingredients[${index}].ingredient[${index2}].subcategory`}
                  />
                </div>
                <div className="two wide column">
                  <button
                    type="button"
                    style={{ marginTop: 25 }}
                    disabled={!buttonsEnabledIngredient[index]}
                    className="ui red icon button"
                    onClick={() => {
                      remove(index2);
                      onIngredientClick();
                    }}
                  >
                    <i className="trash icon"></i>
                  </button>
                </div>
              </div>
            ))}
          <div className="one column row" style={{ marginTop: 5 }}>
            <div className="five wide column">
              <button
                type="button"
                className="positive ui labeled icon button"
                onClick={() => {
                  push({
                    amount: "",
                    unit: "",
                    name: "",
                    subcategory: "",
                  });
                  onIngredientClick();
                }}
              >
                <i className="plus icon" />
                Lägg till ingrediens
              </button>
            </div>
          </div>
        </div>
      )}
    </FieldArray>
  );
}

export default IngredientList;
