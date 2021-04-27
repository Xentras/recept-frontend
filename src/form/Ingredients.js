import React, { useState, useEffect, useCallback } from "react";
import { Fieldset, actions, Control } from "react-redux-form";
import { connect } from "react-redux";
import { Popup, Icon } from "semantic-ui-react";

function Ingredients(props) {
  const [buttonsEnabledIngredient, setButtonsEnabledIngredient] = useState([
    false,
  ]);
  const [buttonsEnabledPerson, setButtonsEnabledPerson] = useState(false);
  const { dispatch } = props;
  const recipe = props.recipe;

  const onAddPersonClick = () => {
    addPerson();
    updateButtonStatePerson();
  };

  const onRemovePersonClick = (i) => {
    removePerson(i);
    updateButtonStatePerson();
  };

  const onAddIngredientClick = (i) => {
    addIngredient(i);
    updateButtonStateIngredients(i);
  };

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
  // this happens when loading an recipe in the "EditRecipeModal"
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
          <div className="two wide column">
            <label htmlFor="size">Antal personer/portioner:</label>
            <Popup
              trigger={<Icon name="info circle" color="blue" />}
              content="Ange hur många personer/portioner som ingredienserna ska räcka till."
              position="top center"
            />
            <Control.input
              model=".size"
              placeholder="Portioner"
              defaultValue=""
              id="size"
            />
          </div>
          <div className="fourteen wide column"></div>
          {recipe.ingredients[i].ingredient.map((test, j) => (
            <Fieldset
              className="ui grid"
              style={{ marginTop: 5 }}
              model={`recipe.ingredients[${i}].ingredient[${j}]`}
              key={j}
            >
              <div className="two wide column">
                <Control.input
                  model=".amount"
                  placeholder="Mängd"
                  defaultValue=""
                />
              </div>
              <div className="two wide column">
                <Control.select model=".unit" defaultValue="">
                  <option value="empty"></option>
                  <option value="kg">kg</option>
                  <option value="hg">hg</option>
                  <option value="g">g</option>
                  <option value="l">l</option>
                  <option value="dl">dl</option>
                  <option value="cl">cl</option>
                  <option value="ml">ml</option>
                  <option value="msk">msk</option>
                  <option value="tsk">tsk</option>
                  <option value="krm">krm</option>
                </Control.select>
              </div>
              <div className="four wide column">
                <Control.input
                  model=".name"
                  placeholder="Ingrediens"
                  defaultValue=""
                />
              </div>
              <div className="four wide column">
                <Control.input
                  model=".subcategory"
                  placeholder="Kategori"
                  defaultValue=""
                />
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
