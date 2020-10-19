import React from "react";
import SearchBar from "../components/SearchBar";
import RecipeImageList from "../components/RecipeImageList";
import axios from "axios";

class Search extends React.Component {
  state = { thumbnail: [] };

  onSearchSubmit = async (term) => {
    const response = await axios.get(
      "http://192.168.10.218:3005/recipe/thumbnail" + term,
      {}
    );

    this.setState({ thumbnail: response.data });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <RecipeImageList thumbnail={this.state.thumbnail} />
      </div>
    );
  }
}

export default Search;
