import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import "../components/compStyle.css";
import { UserDetails } from "../types";

const toolbar = (props: {
  loggedIn: any;
  logoutOfApp: () => void;
  userDetails?: UserDetails;
}) => (
  <header className="toolbar">
    <nav className="toolbar_navigation">
      <div className="toolbar_logo">
        <a>The Family Tree co.</a>
      </div>

      <div className="spacer"></div>

      {/* Ternary operator below takes advantage of the loggedIn state which resides in the parent component app.js.
This basically allows the navbar to check if the state is true or false. True (the user is logged in) will 
render the nav links in the first part of the operator. If false, only the login link should be rendered, as 
only a validated user can see the other links*/}

      {props.loggedIn ? (
        <div data-testid="navbar" className="toolbar_navigation-items">
          <ul>
            <NavLink
              data-testid="allAncestors-link"
              to="/allAncestors"
              activeStyle={{ color: "red" }}
            >
              {" "}
              All Ancestors{" "}
            </NavLink>
            <NavLink
              data-testid="myFamilyTree-link"
              to="/myFamilyTree"
              activeStyle={{ color: "red" }}
            >
              {" "}
              My Family Tree{" "}
            </NavLink>
            <NavLink
              data-testid="about-link"
              to="/about"
              activeStyle={{ color: "red" }}
            >
              {" "}
              About{" "}
            </NavLink>
            <NavLink
              data-testid="logout-link"
              to="/logout"
              activeStyle={{ color: "red" }}
              // invokes the logoutSuccess function contained within app.js onClick event
              onClick={() => props.logoutOfApp()}
            >
              {" "}
              Logout
            </NavLink>
          </ul>
        </div>
      ) : (
        <div data-testid="navbar" className="toolbar_navigation-items">
          <ul>
            <NavLink
              data-testid="login-link"
              to="/login"
              activeStyle={{ color: "red" }}
            >
              {" "}
              Login
            </NavLink>
          </ul>
        </div>
      )}

      {/* userDetails is dynamically updated via the getInfo function, which exists in the login form */}
      <div className="displayUsername" data-testid="displayUsername">
        <p>{props.userDetails ? props.userDetails.name : ""}</p>
      </div>
    </nav>
  </header>
);

export default toolbar;
