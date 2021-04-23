import React, { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResultList from "../components/SearchResult/SearchResultList";
import { getThumbnail } from "../api/api";

function Search() {
  const [thumbnail, setThumbnail] = useState([]);

  const searchText = async (text) => {
    const response = await getThumbnail(text);
    setThumbnail(response.data);
  };

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <SearchBar searchText={searchText} />
      <SearchResultList thumbnail={thumbnail} />
    </div>
  );
}

export default Search;
