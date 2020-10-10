import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import RecipeList from "./RecipeList.js";

export default function RecipeImageList(props) {
  const [show, setshow] = useState(false);
  const [recipeShow, setrecipeShow] = useState();

  const imageClick = (i) => {
    setshow(true);
    setrecipeShow(props.recipes[i]);
  };

  const backClick = () => {
    setshow(false);
  };

  const recipe = props.recipes.map(({ name, imageURL }, i) => {
    return (
      <div>
        <BrowserView>
          <div className="three wide column">
            <div key={i} className="ui cards">
              <a className="card" onClick={() => imageClick(i)}>
                <div className="image">
                  <img alt="" src={imageURL} className="ui medium image" />
                </div>
                <div className="content">
                  <p className="header">{name}</p>
                </div>
              </a>
            </div>
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
                  onClick={() => imageClick(i)}
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
        {!show && (
          <div className="ui grid container" style={{ paddingTop: 10 }}>
            {recipe}
          </div>
        )}
      </BrowserView>
      <MobileView>{!show && recipe}</MobileView>
      {show && (
        <button style={{ margin: 15 }} className="ui labeled icon button" onClick={() => backClick()}>
          <i className="left chevron icon"></i>Tillbaka
        </button>
      )}
      {show && <RecipeList recipes={recipeShow} />}
    </div>
  );
}
