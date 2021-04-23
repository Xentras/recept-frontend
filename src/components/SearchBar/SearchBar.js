import React, { useState } from "react";

function SearchBar({searchText}) {
  const [text, setText] = useState("");

  const onInputChange = (event) => {
    setText(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    searchText(text);
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
