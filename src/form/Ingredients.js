import React from "react";
import { Fieldset, actions, Control } from "react-redux-form";
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
    dispatch(actions.remove("recipe.ingredients", i));
    return;
  }

  async addIngredientField() {
    const { dispatch } = this.props;
    dispatch(actions.push("recipe.ingredients", ""));
    return;
  }

  updateEnableButtonState() {
    const { recipe } = this.props;
    if (recipe.ingredients.length !== 1) {
      this.setState({
        enableButton: true,
      });
    } else if (recipe.ingredients.length === 1) {
      this.setState({
        enableButton: false,
      });
    }
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <label htmlFor="recipe.ingredients">Ingredienser: </label>
        {recipe.ingredients.map((ingredient, i) => (
          <Fieldset
            className="ui grid"
            style={{ marginTop: 0 }}
            model={`recipe.ingredients[${i}]`}
            key={i}
          >
            <div className="two wide column">
              {/* <label htmlFor="recipe.ingredients.amount">Mängd: </label> */}
              <Control.input model=".amount" placeholder="Mängd" />
            </div>
            <div className="two wide column">
              {/* <label htmlFor="recipe.ingredients.unit">Enhet: </label> */}
              <Control.select model=".unit">
                <option value="" disabled selected>
                  Enhet
                </option>
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
              {/* <label htmlFor="recipe.ingredients.name">Ingrediens: </label> */}
              <Control.input model=".name" placeholder="Ingrediens" />
            </div>
            {/* <input type="text" defaultValue="" /> */}
            <div className="one wide column">
              <button
                disabled={!this.state.enableButton}
                className="ui red icon button"
                onClick={() => this.onRemoveClick(i)}
              >
                <i className="trash icon"></i>
              </button>
            </div>
          </Fieldset>
        ))}
        <div>
          <button
            className="positive ui button"
            style={{ marginTop: 10 }}
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
