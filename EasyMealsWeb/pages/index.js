import fetch from "node-fetch";

const Index = (props) => <h1>{props.recipe.summary}</h1>;

Index.getInitialProps = async function () {
  let body = JSON.stringify({ recipeId: "485365" });
  const res = await fetch("http://localhost:8000/api/query/getRecipebyId", {
    method: "post",
    body: body,
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return {
    recipe: data,
  };
};

export default Index;
