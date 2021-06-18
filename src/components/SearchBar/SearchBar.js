import React, { useContext, useEffect, useState } from "react";
import {SearchContext} from "../../Context/SearchContext.js"

function SearchBar({searchRecipe}) {
  const [text, setText] = useState("");
  const state = useContext(SearchContext)

  // This function run everytime the user changes anything with the input field
  const onInputChange = (event) => {
    let text = event.target.value.replace(/[^a-öA-Ö0-9\s]/g, '');
    setText(text);
  };

  // This function run when the user searches for a recipe
  // it will return the text to "search.js"
  const onFormSubmit = (event) => {
    state.setSearch(text, true)
    event.preventDefault();
    searchRecipe(text);
  };

  useEffect(() => {
    if(state.hasSearched) {
      setText(state.searchText)
    }
  }, [])

  return (
    <div className="ui segment">
    <form onSubmit={onFormSubmit} className="ui form">
      <div className="field">
        <label>Sök på recept</label>
        <input
          value={text}
          type="text"
          onChange={onInputChange}
        />
      </div>
    </form>
  </div>
  );
}

export default SearchBar;
