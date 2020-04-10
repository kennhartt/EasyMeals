import React, { Component } from "react";

class Navbar extends Component {
  state = {};

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a class="navbar-brand ml-3">&#10086; EasyMeals</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto mr-3 w-100 justify-content-end">
              <li class="nav-item active">
                <a class="nav-link">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li id="accountItem" class="nav-item">
                <a class="nav-link">Account</a>
              </li>
              <li id="savedRecipes" class="nav-item">
                <a class="nav-link">Saved Recipes</a>
              </li>
              <li id="signInItem" class="nav-item">
                <a class="nav-link">Sign in</a>
              </li>
              <li id="signUpItem" class="nav-item active">
                <a
                  class="nav-link btn-primary rounded"
                  role="button"
                  style={{ width: 120, textAlign: "center" }}
                >
                  Sign up &#9753;
                </a>
              </li>
              <li id="logOutItem" class="nav-item">
                <a class="nav-link">Log out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
