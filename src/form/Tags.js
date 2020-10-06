import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enableButton: false,
    };
  }

  async onRemoveClick(i) {
    await this.removeTag(i);
    this.updateEnableButtonState();
  }

  async onAddClick() {
    await this.addTagField();
    this.updateEnableButtonState();
  }

  removeTag(i) {
    const { dispatch } = this.props;
    dispatch(actions.remove("recipe.tags", i))
    return
  }

  async addTagField() {
    const { dispatch } = this.props;
    dispatch(actions.push("recipe.tags", ""))
    return
  }

  updateEnableButtonState() {
    const { recipe } = this.props;
    if(recipe.tags.length !== 1) {
      this.setState({
        enableButton: true
      })
    } else if (recipe.tags.length === 1) {
      this.setState({
        enableButton: false
      })
    }
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <label htmlFor="recipe.tags">Tags: </label>
        {recipe.tags.map((tag, i) => (
          <Field
            className="ui fluid action input"
            style={{ paddingTop: 5, paddingBottom: 5 }}
            model={`recipe.tags[${i}]`}
            key={i}
          >
            <input type="text" defaultValue="" />
            <button
              disabled={!this.state.enableButton}
              className="ui red icon button"
              onClick={() => this.onRemoveClick(i)}
            >
              <i className="trash icon"></i>
            </button>
          </Field>
        ))}
        <div>
          <button
            className="positive ui button"
            style={{ paddingTop: 10 }}
            onClick={() => this.onAddClick()}
          >
            Add Tag
          </button>
        </div>
      </div>
    );
  }
}

export default connect((s) => s)(Tags);
