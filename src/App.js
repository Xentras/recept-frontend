import React from "react";
//import axios from "axios";
import Header from './components/Header';
import Route from './components/Route';
import Search from './components/Search';
import Add from './components/Add';

export default class App extends React.Component {
  render() {
    return (
        <div>
          <Header />
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/add">
            <Add/>
          </Route>
        </div>
    );
  }
}

/*
state = {
    recipes: [],
  };
  componentDidMount() {
    axios.get("http://192.168.10.218:3005/recipe").then((response) => {
      this.setState({ recipes: response.data });
    });
  }

{this.state.recipes.map(({name, tags, steps, ingredients, description}, i) => {
          return <div key={i} className="card">
            <div className="card-body">
              <h1>{name}</h1>
              <ul>
              {tags.map((tag, j) => {
                return <li key={j}>Tag-{j} = {tag}</li>
              })}
              </ul>
              <ul>
              {steps.map((step, j) => {
                return <li key={j}>Step-{j} = {step}</li>
              })}
              </ul>
              <ul>
              {ingredients.map((ingredient, j) => {
                return <li key={j}>ingredient-{j} = {ingredient}</li>
              })}
              </ul>
              <p>Description = {description}</p>
            </div>
          </div>
        })}
      </div>

*/