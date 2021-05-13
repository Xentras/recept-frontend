import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search.js";
import Add from "./pages/Add.js";
import MenuNavBar from "./components/MenuBar/MenuNavBar.js";


function App() {
  return (
    <div className="container">
        <Router>
          <MenuNavBar />
          <ToastProvider placement="top-center" autoDismiss>
            <Switch>
              <Route component={Add} path="/add" />
              <Route component={Search} path="/" />
            </Switch>
          </ToastProvider>
        </Router>
    </div>
  );
}

export default App;
