import React, { Component } from "react";
import Link from "next/link";

const RecipeLink = (props) => (
  <li>
    <Link href="/recipe/[recipeId]" as={`/recipe/${props.recipeId}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

class SearchResults extends Component {
  state = {};

  render() {
    return (
      <div class="container">
        <div class="row border-bottom">
          <div class="col-md-4">
            <h1 id="titleCard" class="">
              Recipes
            </h1>
          </div>
        </div>

        <div id="results" class="table" style={{ marginTop: 13 }}></div>
        <ul>
          <RecipeLink title="Breakfast Pizza" recipeId="559251" />
          <RecipeLink title="Egg and rocket pizzas" recipeId="630293" />
        </ul>
        <hr />
      </div>
    );
  }
}

export default SearchResults;
