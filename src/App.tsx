//built in react imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//custom imports
import LoginForm from "./components/pages/loginForm";
import AboutPage from "./components/pages/about";
import MyFamilyTree from "./components/pages/myFamilyTree";
import AllAncestorsPage from "./components/pages/allAncestors";
import Logout from "./components/pages/logout";
import Toolbar from "./components/toolbar";
import "./App.css";
import { UserDetails } from "./types";

//the main function of the application, which will dynamically load based upon
//how the user interacts with the web application
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>(
    undefined
  );
  const [ancestorDetails, setAncestorDetails] = useState([]);

  const loginSuccess = () => {
    setIsLoggedIn(true);
  };

  const logOutSuccess = () => {
    setUserDetails(undefined);
    setIsLoggedIn(false);
  };

  const displayAncestorDetails = () => {
    setAncestorDetails(ancestorDetails);
  };

  return (
    <Router>
      <div className="App">
        <Toolbar
          loggedIn={isLoggedIn}
          userDetails={userDetails}
          logoutOfApp={logOutSuccess}
        />

        <main style={{ marginTop: "64px" }}>_</main>
        <div className="App-body">
          <Route
            path="/login"
            exact
            render={() => {
              return (
                <LoginForm
                  correctLogin={loginSuccess}
                  setUserDetails={setUserDetails}
                />
              );
            }}
          />

          <Route
            path="/allAncestors"
            exact
            render={() => {
              return <AllAncestorsPage />;
            }}
          />
          <Route
            path="/myFamilyTree"
            exact
            render={() => {
              return <MyFamilyTree userDetails={userDetails} />;
            }}
          />
          <Route
            path="/about"
            exact
            render={() => {
              return <AboutPage />;
            }}
          />
          <Route
            path="/logout"
            exact
            render={() => {
              return <Logout />;
            }}
          />
        </div>

        <div className="footer">
          <p>A web app created by Lauren Mather</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
