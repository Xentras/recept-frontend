import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Recipe from "../Recipe/Recipe.js";

function SearchResultList(props) {
  const [showBackButton, setShowBackButton] = useState(false);
  const [recipeToShow, setRecipeToShow] = useState();

  // This function is used when a user clicks on a recipe from the search results
  // it will send the name of the recipe that was clicked to "recipe.js"
  const openRecipe = (i) => {
    setShowBackButton(true);
    setRecipeToShow(props.thumbnail[i]);
  };

  // This function is used when a user clicks on the back button
  // this will hide the back button when the user is in the search result area
  const onBackButtonClick = () => {
    setShowBackButton(false);
  };

  // This function is used to display all the recipes that are returned from the search
  // it will create a list of clickable thumbnails
  const recipeThumbnailList = props.thumbnail.map(({ name, imageURL }, i) => {
    return (
      <div key={i} className="four wide column">
        <BrowserView>
          <div key={i} className="ui cards">
            <a className="card" href="/#" onClick={() => openRecipe(i)}>
              <div className="image">
                <img alt="" src={imageURL} className="ui medium image" />
              </div>
              <div className="content">
                <p className="header">{name}</p>
              </div>
            </a>
          </div>
        </BrowserView>
        <MobileView>
          <div key={i} className="ui cards">
            <div className="card">
              <div className="image">
                <img
                  alt=""
                  src={imageURL}
                  className="ui medium image"
                  onClick={() => openRecipe(i)}
                />
              </div>
              <div className="content">
                <p className="header">{name}</p>
              </div>
            </div>
          </div>
        </MobileView>
      </div>
    );
  });

  return (
    <div>
      <BrowserView>
        {!showBackButton && (
          <div className="ui grid container" style={{ paddingTop: 10 }}>
            {recipeThumbnailList}
          </div>
        )}
      </BrowserView>
      <MobileView>{!showBackButton && recipeThumbnailList}</MobileView>
      {showBackButton && (
        <Recipe thumbnail={recipeToShow} onBackButtonClick={onBackButtonClick} />
      )}
    </div>
  );
}

export default SearchResultList;
