import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";

function SearchResultList(props) {
  // This function is used to display all the recipes that are returned from the search
  // it will create a list of clickable thumbnails
  const recipeThumbnailList = props.thumbnail.map(({ name, imageURL }, i) => {
    return (
      <div key={i} className="four wide column">
        <BrowserView>
          <div key={i} className="ui cards">
            <Link className="card" to={"/recept/" + props.thumbnail[i]._id}>
              <div className="image">
                <img alt="" src={imageURL} className="ui medium image" />
              </div>
              <div className="content">
                <p className="header">{name}</p>
              </div>
            </Link>
          </div>
        </BrowserView>
        <MobileView>
          <div key={i} className="ui centered cards">
            <Link className="card" to={"/recept/" + props.thumbnail[i]._id}>
              <div className="image">
                <img alt="" src={imageURL} className="ui medium image" />
              </div>
              <div className="content">
                <p className="header">{name}</p>
              </div>
            </Link>
          </div>
        </MobileView>
      </div>
    );
  });

  return (
    <div>
      <BrowserView>
        <div className="ui grid container" style={{ paddingTop: 10 }}>
          {recipeThumbnailList}
        </div>
      </BrowserView>
      <MobileView>{recipeThumbnailList}</MobileView>
    </div>
  );
}

export default SearchResultList;
