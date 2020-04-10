import fetch from "node-fetch";
import Link from "next/link";
import Navbar from "../components/navbar";
import Banner from "../components/banner";

const RecipeLink = (props) => (
  <li>
    <Link href="/recipe/[recipeId]" as={`/recipe/${props.recipeId}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default function Index() {
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <Banner />
      </div>
    </React.Fragment>
  );
}

/*<ul>
<RecipeLink title="Breakfast Pizza" recipeId="559251" />
<RecipeLink title="Egg and rocket pizzas" recipeId="630293" />
</ul> */
