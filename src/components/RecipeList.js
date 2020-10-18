import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeList(props) {
  // const [recipe, setRecipe] = useState([]);
  // const [stateLoaded, setStateLoaded] = useState(false);

  // useEffect(() => {
  //   const loadRecipe = async () => {
  //     const response = await axios
  //       .get("http://192.168.10.218:3005/recipe/" + props.recipes.name)
  //       .then((response) => {
  //         console.log(response.data[0]);
  //         setRecipe(response.data[0]);
  //         setStateLoaded(true);
  //       });
  //   };
  //   loadRecipe();
  //   // console.log(recipe);
  // }, []);

  return (
    <div className="ui grid">
      {/* {stateLoaded && ( */}
        <div className="two column row">
          <div className="column">
            {/* <h1>{recipe.name}</h1> */}
            <h1>{props.recipes.name}</h1>
            <p>Källa: {props.recipes.source}</p>
            <div className="ui divider"></div>
            <p>Ingredienser:</p>
            <div className="ui bulleted list">
              {props.recipes.ingredients.map((ingredient, j) => {
                return (
                  <div className="item" key={j}>
                    <p>
                      {ingredient.amount}
                      {ingredient.unit} - {ingredient.name}
                    </p>
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
      {/* )} */}
    </div>
  );
}
