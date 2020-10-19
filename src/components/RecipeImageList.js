import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import RecipeList from "./RecipeList.js";

export default function RecipeImageList(props) {
  const [show, setshow] = useState(false);
  const [recipeShow, setrecipeShow] = useState();

  const imageClick = (i) => {
    setshow(true);
    setrecipeShow(props.thumbnail[i]);
  };

  const backClick = () => {
    setshow(false);
  };
  
  const thumbnailList = props.thumbnail.map(({ name, imageURL }, i) => {
    return (
      <div key={i} className="four wide column" >
        <BrowserView>
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
            {thumbnailList}
          </div>
        )}
      </BrowserView>
      <MobileView>{!show && thumbnailList}</MobileView>
      {show && <RecipeList thumbnail={recipeShow} onChange={backClick} />}
    </div>
  );
}
