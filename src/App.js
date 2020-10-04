import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import Add from "./pages/Add";
import MenuNavBar from "./components/MenuNavBar";
import { Provider } from "react-redux";
import store from "./store.js";

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Provider store={store}>
          <Router>
            <MenuNavBar />
            <Switch>
              <Route component={Add} path="/add" />
              <Route component={Search} path="/" />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}
