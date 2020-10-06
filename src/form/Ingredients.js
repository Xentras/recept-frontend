import React from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enableButton: false,
    };
  }

  async onRemoveClick(i) {
    await this.removeIngredient(i);
    this.updateEnableButtonState();
  }

  async onAddClick() {
    await this.addIngredientField();
    this.updateEnableButtonState();
  }

  removeIngredient(i) {
    const { dispatch } = this.props;
    dispatch(actions.remove("recipe.ingredients", i))
    return
  }

  async addIngredientField() {
    const { dispatch } = this.props;
    dispatch(actions.push("recipe.ingredients", ""))
    return
  }

  updateEnableButtonState() {
    const { recipe } = this.props;
    if(recipe.ingredients.length !== 1) {
      this.setState({
        enableButton: true
      })
    } else if (recipe.ingredients.length === 1) {
      this.setState({
        enableButton: false
      })
    }
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <label htmlFor="recipe.ingredients">Ingredients: </label>
        {recipe.ingredients.map((ingredient, i) => (
          <Field
            className="ui fluid action input"
            style={{ paddingTop: 5, paddingBottom: 5 }}
            model={`recipe.ingredients[${i}]`}
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
            Add Ingredient
          </button>
        </div>
      </div>
    );
  }
}

export default connect((s) => s)(Ingredients);
