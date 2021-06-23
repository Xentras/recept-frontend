import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import _ from "lodash";
import { BrowserView, isBrowser, MobileView } from "react-device-detect";

function RecipeContent(props) {
  const [currentIngredientList, setCurrentIngredientList] = useState(
    props.ingredientList
  );
  const recipe = props.recipe;
  const dropdownSizeOptions = props.dropdownSizeOptions;

  // This function will run when the user changes how many people/portions a recipe is set to
  const changeIngredientList = (event, data) => {
    setCurrentIngredientList(
      _.chain(recipe.ingredients[data.value].ingredient)
        // Group the elements of Array based on `subcategory` property
        .groupBy("subcategory")
        // `key` is group's name (subcategory), `value` is the array of objects
        .map((value, key) => ({ subcategory: key, ingredients: value }))
        .value()
    );
  };

  // This function will create headers for subcategories of ingredients
  const setCatergoryHeader = (subcategory) => {
    if (subcategory === "") {
      return "Övrigt";
    } else {
      return subcategory;
    }
  };

  const removeEmptyText = (unit) => {
    if (unit === "empty") {
      return "";
    } else {
      return unit;
    }
  };

  return (
    <>
      <div className="two column row">
        <div className="column">
          <h1>{recipe.name}</h1>
          <p>Källa: {recipe.source}</p>
          <div className="ui divider"></div>
          <div>
            <h3 style={{ display: "inline-block" }}>Ingredienser</h3>
            <div
              style={
                isBrowser ? { display: "inline-block", float: "right" } : {}
              }
            >
              <BrowserView>
                <Dropdown
                  selection
                  options={dropdownSizeOptions || []}
                  onChange={changeIngredientList}
                  defaultValue={0}
                />
              </BrowserView>
              <MobileView>
                <Dropdown
                  selection
                  compact
                  options={dropdownSizeOptions || []}
                  onChange={changeIngredientList}
                  defaultValue={0}
                />
              </MobileView>
            </div>
          </div>
          <div className="ui list">
            {currentIngredientList.map((subcategory, j) => {
              return (
                <div className="item" key={j}>
                  <div className="header">
                    {setCatergoryHeader(subcategory.subcategory)}
                  </div>
                  <div className="ui bulleted list">
                    {currentIngredientList[j].ingredients.map(
                      (ingredient, i) => {
                        return (
                          <div key={i} className="item">
                            {ingredient.amount}{" "}
                            {removeEmptyText(ingredient.unit)} {ingredient.name}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="ui divider"></div>
          <BrowserView>
            <h3>Gör så här</h3>
            <div className="ui ordered list">
              {recipe.steps.map((step, j) => {
                return (
                  <div className="item" key={j}>
                    {step}
                  </div>
                );
              })}
            </div>
            <div className="ui divider"></div>
          </BrowserView>
        </div>
        <div className="column">
          <img
            alt=""
            src={recipe.imageURL}
            className="ui medium rounded image"
          />
          <p>
            Beskrivning: <br />
            {recipe.description}
          </p>
          <div className="ui divider"></div>
          <p>Kategori:</p>
          <div className="ui tag labels">
            {recipe.tags.map((tag, j) => {
              return (
                <div className="ui teal label" key={j}>
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <MobileView className="one column row" style={{paddingTop: 0}}>
        <div className="column">
          <h3>Gör så här</h3>
          <div className="ui ordered list">
            {recipe.steps.map((step, j) => {
              return (
                <div className="item" key={j}>
                  {step}
                </div>
              );
            })}
          </div>
        </div>
        <div className="ui divider"></div>
      </MobileView>
    </>
  );
}

export default RecipeContent;
