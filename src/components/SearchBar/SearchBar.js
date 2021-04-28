import React, { useState } from "react";

function SearchBar({searchRecipe}) {
  const [text, setText] = useState("");

  // This function run everytime the user changes anything with the input field
  const onInputChange = (event) => {
    setText(event.target.value);
  };

  // This function run when the user searches for a recipe
  // it will return the text to "search.js"
  const onFormSubmit = (event) => {
    event.preventDefault();
    searchRecipe(text);
  };

  return (
    <div className="ui segment">
    <form onSubmit={onFormSubmit} className="ui form">
      <div className="field">
        <label>Sök på recept</label>
        <input
          type="text"
          onChange={onInputChange}
        />
      </div>
    </form>
  </div>
  );
}

export default SearchBar;
