import fetch from "node-fetch";

const Index = (props) => <h1>Hello</h1>;

Index.getInitialProps = async function () {
  let body = JSON.stringify({ recipeId: "485365" });
  const res = await fetch("http://localhost:8000/api/query/getRecipebyId", {
    method: "post",
    body: body,
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data);

  return {
    data,
  };
};

export default Index;
