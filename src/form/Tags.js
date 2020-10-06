import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Tags extends React.Component {
  render() {
    const { recipe, dispatch } = this.props;
    return (
      <div>
        <label htmlFor="recipe.tags">Tags: </label>
        {recipe.tags.map((tag, i) => (
          <Field className="ui fluid action input" style={{paddingTop: 5, paddingBottom: 5}} model={`recipe.tags[${i}]`} key={i}>
            <input type="text" defaultValue="" />
            <button className="ui red icon button" onClick={() => dispatch(actions.remove("recipe.tags", i))}><i className="trash icon"></i></button>
          </Field>
        ))}
        <div>
        <button className="positive ui button" style={{paddingTop: 10}} onClick={() => dispatch(actions.push("recipe.tags", ""))}>
          Add Tag
        </button>
        </div>
      </div>
    );
  }
}

export default connect((s) => s)(Tags);
