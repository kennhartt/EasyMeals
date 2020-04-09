import fetch from "node-fetch";
import Link from "next/link";

const RecipeLink = (props) => (
  <li>
    <Link href="/recipe/[recipeId]" as={`/recipe/${props.recipeId}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default function Index() {
  return (
    <ul>
      <RecipeLink title="Breakfast Pizza" recipeId="559251" />
      <RecipeLink title="Egg and rocket pizzas" recipeId="630293" />
    </ul>
  );
}
