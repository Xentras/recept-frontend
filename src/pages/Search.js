import React, { useState, useContext, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar.js";
import SearchResultList from "../components/SearchResult/SearchResultList.js";
import {LoadingSpinner} from "../components/Common/LoadingSpinner/LoadingSpinner.js"
import { getThumbnail } from "../api/api";
import {SearchContext} from "../Context/SearchContext.js"

function Search(props) {
  const [thumbnail, setThumbnail] = useState([]);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const state = useContext(SearchContext)

  const searchRecipe = async (text) => {
    setShowLoadingSpinner(true);
    const response = await getThumbnail(text);
    setShowLoadingSpinner(false);
    setThumbnail(response.data);
  };

  useEffect(() => {
    if(state.hasSearched) {
      searchRecipe(state.searchText)
    }
  }, [])

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <SearchBar searchRecipe={searchRecipe} />
      {showLoadingSpinner ? <LoadingSpinner size={'medium'}/> : <SearchResultList thumbnail={thumbnail} history={props.history} />}
    </div>
  );
}

export default Search;
