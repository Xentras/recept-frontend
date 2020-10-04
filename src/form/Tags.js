import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Tags extends React.Component {
  render() {
    const { recipe, dispatch } = this.props;
    return (
      <div>
        {/* <label htmlFor="recipe.tags">tags: </label>
      <Control.text model="recipe.tags[0]" id="recipe.tags[0]" /> */}
        {recipe.tags.map((tag, i) => (
          <Field model={`recipe.tags[${i}]`} key={i}>
            <input type="text" />
            <button onClick={() => dispatch(actions.remove("recipe.tags", i))}>Remove</button>
          </Field>
        ))}
        <button onClick={() => dispatch(actions.push("recipe.tags", ""))}>
          Add Tag
        </button>
      </div>
    );
  }
}

export default connect((s) => s)(Tags);
