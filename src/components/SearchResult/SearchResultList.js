import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import RecipeList from "../RecipeList.js";

function SearchResultList(props) {
  const [showBackButton, setShowBackButton] = useState(false);
  const [recipeShow, setrecipeShow] = useState();

  const openRecipe = (i) => {
    setShowBackButton(true);
    setrecipeShow(props.thumbnail[i]);
  };

  const onBackClick = () => {
    setShowBackButton(false);
  };

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
        <RecipeList thumbnail={recipeShow} onChange={onBackClick} />
      )}
    </div>
  );
}

export default SearchResultList;
