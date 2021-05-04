import React, { useState, useEffect, useCallback } from "react";
import { Fieldset, actions } from "react-redux-form";
import { connect } from "react-redux";
import { Popup, Icon } from "semantic-ui-react";
import Input from "../Common/Input/Input.js";
import Dropdown from "../Common/Dropdown/Dropdown.js";

function Ingredients(props) {
  const [buttonsEnabledIngredient, setButtonsEnabledIngredient] = useState([
    false,
  ]);
  const [buttonsEnabledPerson, setButtonsEnabledPerson] = useState(false);
  const { dispatch } = props;
  const recipe = props.recipe;

  // This function will run when the user adds a new portion/person
  const onAddPersonClick = () => {
    addPerson();
    updateButtonStatePerson();
  };

  // This function will run when the user removes a portion/person
  const onRemovePersonClick = (i) => {
    removePerson(i);
    updateButtonStatePerson();
  };

  // This function will run when the user adds a new ingredient
  const onAddIngredientClick = (i) => {
    addIngredient(i);
    updateButtonStateIngredients(i);
  };

  // This function will run when the user removes an ingredient
  const onRemoveIngredientClick = (i, j) => {
    removeIngredient(i, j);
    updateButtonStateIngredients(i);
  };

  // This will remove an ingredient from the redux store
  const removeIngredient = (i, j) => {
    dispatch(actions.remove(`recipe.ingredients[${i}].ingredient`, j));
  };

  const removePerson = (i) => {
    // This will remove a person from the redux store
    dispatch(actions.remove("recipe.ingredients", i));

    // If person is removed, the state for the associated "remove ingredient" button is removed
    const newArr = [...buttonsEnabledIngredient]; // copying the buttonsEnabledIngredient array
    setButtonsEnabledIngredient(
      newArr.slice(0, i).concat(newArr.slice(i + 1, newArr.length))
    );
  };

  const addPerson = () => {
    // This is needed to initialize a new person
    const initializePerson = {
      size: "",
      ingredient: [{ name: "", amount: "", unit: "", subcategory: "" }],
    };
    // This will add a new person to the redux store
    dispatch(actions.push("recipe.ingredients", initializePerson));

    // When adding a new person, a new variable for keeping track of "ingredient" button state is added
    setButtonsEnabledIngredient((prevArray) => [...prevArray, false]);
  };

  // This will add a ingredient to the redux store
  const addIngredient = (i) => {
    dispatch(actions.push(`recipe.ingredients[${i}].ingredient`, ""));
  };

  // If there are more than 1 ingredient, the button to remove a ingredient should be available
  const updateButtonStateIngredients = useCallback(() => {
    if (recipe.ingredients.length !== buttonsEnabledIngredient.length) {
      updateOnLoad();
    } else if (recipe.ingredients.length === buttonsEnabledIngredient.length) {
      let newArr = [...buttonsEnabledIngredient]; // copying the buttonsEnabledIngredient array
      // this will update the state everytime a ingredient is added/removed
      for (var i = 0; i < recipe.ingredients.length; i++) {
        if (recipe.ingredients[i].ingredient.length !== 1) {
          newArr[i] = true;
        } else if (recipe.ingredients[i].ingredient.length === 1) {
          newArr[i] = false;
        }
      }
      setButtonsEnabledIngredient(newArr);
    }
  }, [recipe.ingredients]);

  // If there are more than 1 person, the button to remove a person should be available
  const updateButtonStatePerson = useCallback(() => {
    // this if/else will update the state everytime a person is added/removed
    if (recipe.ingredients.length !== 1) {
      setButtonsEnabledPerson(true);
    } else if (recipe.ingredients.length === 1) {
      setButtonsEnabledPerson(false);
    }
  }, [recipe.ingredients.length]);

  // This function is used when the ingredientlist and buttonsEnabledIngredient are not the same length
  // this happens when loading a recipe when the user is editing a recipe
  // it will make sure that the button state for remove ingredients buttons are correct
  const updateOnLoad = () => {
    let newArr = buttonsEnabledIngredient; // copying the buttonsEnabledIngredient array
    // this if/else will update the state everytime a ingredient is added/removed
    for (var i = 0; i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].ingredient.length !== 1) {
        newArr[i] = true;
      } else if (recipe.ingredients[i].ingredient.length === 1) {
        newArr[i] = false;
      }
    }
    setButtonsEnabledIngredient(newArr);
  };

  useEffect(() => {
    updateButtonStateIngredients();
    updateButtonStatePerson();
  }, [updateButtonStatePerson, updateButtonStateIngredients]);

  return (
    <div className="ui segment">
      <label htmlFor="recipe.ingredients">Ingredienser: </label>
      {recipe.ingredients.map((ingredient, i) => (
        <Fieldset
          className="ui grid"
          style={{ marginBottom: 10, marginTop: 5 }}
          model={`recipe.ingredients[${i}]`}
          key={i}
        >
          <div className="four wide column">
            <label htmlFor="size">Antal personer/portioner:</label>
            <Popup
              trigger={<Icon name="info circle" color="blue" />}
              content="Ange hur många personer/portioner som ingredienserna ska räcka till."
              position="top center"
            />
            <Input model={".size"} placeholder={"Portioner"} />
          </div>
          <div className="twelve wide column"></div>
          {recipe.ingredients[i].ingredient.map((ingredients, j) => (
            <Fieldset
              className="ui grid"
              style={{ marginTop: 5 }}
              model={`recipe.ingredients[${i}].ingredient[${j}]`}
              key={j}
            >
              <div className="two wide column">
                <Input model={".amount"} placeholder={"Mängd"} />
              </div>
              <div className="two wide column">
                <Dropdown model={".unit"}/>
              </div>
              <div className="four wide column">
                <Input model={".name"} placeholder={"Ingrediens"} />
              </div>
              <div className="four wide column">
                <Input model={".subcategory"} placeholder={"Kategori"} />
              </div>
              <div className="one wide column">
                <button
                  disabled={!buttonsEnabledIngredient[i]}
                  className="ui red icon button"
                  onClick={() => onRemoveIngredientClick(i, j)}
                >
                  <i className="trash icon"></i>
                </button>
              </div>
            </Fieldset>
          ))}
          <div className="eight wide column">
            <button
              className="positive ui labeled icon button"
              style={{ marginTop: 10 }}
              onClick={() => onAddIngredientClick(i)}
            >
              <i className="plus icon" />
              Lägg till ingrediens
            </button>
            <button
              disabled={!buttonsEnabledPerson}
              className="ui red icon button"
              onClick={() => onRemovePersonClick(i)}
            >
              <i className="trash icon" />
              Ta bort person/portion
            </button>
          </div>
        </Fieldset>
      ))}
      <div>
        <button
          className="primary ui labeled icon button"
          style={{ marginTop: 10 }}
          onClick={() => onAddPersonClick()}
        >
          <i className="plus icon" />
          Lägg till person/portion
        </button>
      </div>
    </div>
  );
}

export default connect((s) => s)(Ingredients);
