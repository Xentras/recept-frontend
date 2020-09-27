import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Add from "./pages/Add";
import MenuNavBar from "./components/MenuNavBar";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router>
          <MenuNavBar />
          <Switch>
            <Route component={Add} path="/add" />
            <Route component={Search} path="/search" />
            <Route component={Upload} path="/upload" />
            <Route component={Home} path="/" />
          </Switch>
        </Router>
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
