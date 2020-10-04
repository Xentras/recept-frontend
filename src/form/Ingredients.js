import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Ingredients extends React.Component {
  render() {
    const { recipe, dispatch } = this.props;
    return (
      <div>
        {/* <label htmlFor="recipe.ingredients">Ingredients: </label>
      <Control.text model="recipe.ingredients[0]" id="recipe.ingredients[0]" /> */}
        {recipe.ingredients.map((ingredient, i) => (
          <Field model={`recipe.ingredients[${i}]`} key={i}>
            <input type="text" />
            <button onClick={() => dispatch(actions.remove("recipe.ingredients", i))}>Remove</button>
          </Field>
        ))}
        <button onClick={() => dispatch(actions.push("recipe.ingredients", ""))}>
          Add Ingredient
        </button>
      </div>
    );
  }
}

export default connect((s) => s)(Ingredients);
