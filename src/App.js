import React, {useContext, useEffect, useState} from "react";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
import Search from "./pages/Search.js";
import Add from "./pages/Add.js";
import MenuNavBar from "./components/MenuBar/MenuNavBar.js";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute.js"
import { store } from "./Context/Store.js";
import CheckLoggedIn from "./helper/CheckLoggedIn/CheckLoggedIn.js";
import {LoadingSpinner} from "./components/Common/LoadingSpinner/LoadingSpinner.js"
import Recipe from "./components/Recipe/Recipe.js"
import { SearchContextProvider } from "./Context/SearchContext.js"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const auth = useContext(store);
  const { dispatch } = auth;

  // This will do a basic check if the user is logged in when refreshing the page
  useEffect(() => {
    async function checkIfLoggedIn() {
      if(sessionStorage.getItem("token") !== "" && sessionStorage.getItem("token") !== null) {
        let response = await CheckLoggedIn()
        if(response === true) {
          dispatch({ type: 'LOGIN' })
        }
      }
      setIsLoading(false)
    }

    checkIfLoggedIn()
  }, [setIsLoading])

  return (
    <BrowserRouter>
      <SearchContextProvider>
        <div className="container">
          {isLoading && (
            <div style={{ marginTop: "100px" }}>
              <LoadingSpinner size={"big"} text={"Laddar sidan"} />
            </div>
          )}
          {!isLoading && (
            <Router>
              <ToastProvider placement="top-center" autoDismiss>
                <MenuNavBar />
                <Switch>
                  <GuardedRoute
                    component={Add}
                    path="/add"
                    auth={auth.state.loggedIn}
                  />
                  <Route component={Recipe} path="/recept/:id" />
                  <Route component={Search} path="/" />
                </Switch>
              </ToastProvider>
            </Router>
          )}
        </div>
      </SearchContextProvider>
    </BrowserRouter>
  );
}

export default App;
