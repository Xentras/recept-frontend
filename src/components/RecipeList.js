import React from "react";

export default function RecipeList(props) {
  return (
    <div className="ui grid">
      <div className="two column row">
        <div className="column">
          <h1>{props.recipes.name}</h1>
          <p>Källa: {props.recipes.source}</p>
          <div className="ui divider"></div>
          <p>Ingredienser:</p>
          <div className="ui bulleted list">
            {props.recipes.ingredients.map((ingredient, j) => {
              return (
                <div className="item" key={j}>
                  <p>{ingredient.amount}{ingredient.unit} - {ingredient.name}</p>
                </div>
              );
            })}
          </div>
          <div className="ui divider"></div>
          <p>Steg:</p>
          <div className="ui ordered list">
            {props.recipes.steps.map((step, j) => {
              return (
                <div className="item" key={j}>
                  {step}
                </div>
              );
            })}
          </div>

          <div className="ui divider"></div>
        </div>
        <div className="column">
          <img
            alt=""
            src={props.recipes.imageURL}
            className="ui medium rounded image"
          />
          <p>
            Beskrivning: <br />
            {props.recipes.description}
          </p>
          <div className="ui divider"></div>
          <p>Kategori:</p>
          <div className="ui tag labels">
            {props.recipes.tags.map((tag, j) => {
              return (
                <div className="ui teal label" key={j}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
