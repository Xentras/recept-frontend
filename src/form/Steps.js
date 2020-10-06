import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Steps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enableButton: false,
    };
  }

  async onRemoveClick(i) {
    await this.removeStep(i);
    this.updateEnableButtonState();
  }

  async onAddClick() {
    await this.addStepField();
    this.updateEnableButtonState();
  }

  removeStep(i) {
    const { dispatch } = this.props;
    dispatch(actions.remove("recipe.steps", i))
    return
  }

  async addStepField() {
    const { dispatch } = this.props;
    dispatch(actions.push("recipe.steps", ""))
    return
  }

  updateEnableButtonState() {
    const { recipe } = this.props;
    if(recipe.steps.length !== 1) {
      this.setState({
        enableButton: true
      })
    } else if (recipe.steps.length === 1) {
      this.setState({
        enableButton: false
      })
    }
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <label htmlFor="recipe.steps">Steps: </label>
        {recipe.steps.map((step, i) => (
          <Field
            className="ui fluid action input"
            style={{ paddingTop: 5, paddingBottom: 5 }}
            model={`recipe.steps[${i}]`}
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
            Add Step
          </button>
        </div>
      </div>
    );
  }
}

export default connect((s) => s)(Steps);
