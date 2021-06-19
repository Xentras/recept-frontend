import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar.js";
import SearchResultList from "../components/SearchResult/SearchResultList.js";
import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner.js"
import { getThumbnail } from "../api/api";

function Search() {
  const [thumbnail, setThumbnail] = useState([]);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const searchRecipe = async (text) => {
    setShowLoadingSpinner(true);
    const response = await getThumbnail(text);
    setShowLoadingSpinner(false);
    setThumbnail(response.data);
  };

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <SearchBar searchRecipe={searchRecipe} />
      {showLoadingSpinner ? <LoadingSpinner size={'medium'}/> : <SearchResultList thumbnail={thumbnail} />}
    </div>
  );
}

export default Search;
