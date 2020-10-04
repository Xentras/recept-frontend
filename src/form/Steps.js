import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Steps extends React.Component {
  render() {
    const { recipe, dispatch } = this.props;
    return (
      <div>
        {/* <label htmlFor="recipe.steps">steps: </label>
      <Control.text model="recipe.steps[0]" id="recipe.steps[0]" /> */}
        {recipe.steps.map((step, i) => (
          <Field model={`recipe.steps[${i}]`} key={i}>
            <input type="text" />
            <button onClick={() => dispatch(actions.remove("recipe.steps", i))}>Remove</button>
          </Field>
        ))}
        <button onClick={() => dispatch(actions.push("recipe.steps", ""))}>
          Add Step
        </button>
      </div>
    );
  }
}

export default connect((s) => s)(Steps);
