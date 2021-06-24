import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import { Pagination } from "semantic-ui-react";

function SearchResultList(props) {
  const [activePage, setActivePage] = useState(1);
  const [visibleItems, setVisibleItems] = useState([]);
  const allRecipes = props.thumbnail;
  const itemsPerPage = 20;
  const totalPages = props.thumbnail.length / itemsPerPage;

  const onChange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
  };

  useEffect(() => {
    setVisibleItems(
      allRecipes.slice(
        (activePage - 1) * itemsPerPage,
        (activePage - 1) * itemsPerPage + itemsPerPage
      )
    );
  }, [props.thumbnail, activePage]);

  // This function is used to display all the recipes that are returned from the search
  // it will create a list of clickable thumbnails
  const recipeThumbnailList = visibleItems.map(({ name, imageURL }, i) => {
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
      <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3%",
          }}
        >
          {totalPages > 1 && (
            <Pagination
              onPageChange={onChange}
              activePage={activePage}
              totalPages={totalPages}
              ellipsisItem={null}
            />
          )}
        </div>
    </div>
  );
}

export default SearchResultList;
