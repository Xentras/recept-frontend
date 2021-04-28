// import React from "react";
// import SearchBar from "../components/SearchBar/SearchBarOld";
// import RecipeImageList from "../components/RecipeImageList";
// import axios from "axios";

// class Search extends React.Component {
//   state = { thumbnail: [] };

//   onSearchSubmit = async (term) => {
//     const response = await axios.get(
//       "https://xentras-recipe-backend.herokuapp.com/recipe/thumbnail/" + term,
//       {}
//     );

//     this.setState({ thumbnail: response.data });
//     console.log(this.state.thumbnail)
//   };

//   render() {
//     return (
//       <div className="ui container" style={{ marginTop: "10px" }}>
//         <SearchBar onSubmit={this.onSearchSubmit} />
//         <RecipeImageList thumbnail={this.state.thumbnail} />
//       </div>
//     );
//   }
// }

// export default Search;
