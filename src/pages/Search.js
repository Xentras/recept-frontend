import React from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import axios from "axios";

class Search extends React.Component {
  state = { recipes: [] };

  onSearchSubmit = async (term) => {
    const response = await axios.get(
      "http://192.168.10.218:3005/recipe/" + term,
      {}
    );

    this.setState({ recipes: response.data });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default Search;
