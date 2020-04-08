import fetch from "node-fetch";

export default function Recipe ({data}) {

    return <h1>{data.summary}</h1>
};

export async function getServerSideProps({query}) {
    const { recipeId } = query;
    const res = await fetch(`http://localhost:8000/api/query/getRecipebyId/${recipeId}`);
    const data = await res.json();

    return {
        props: {data}
    };
}

// POST Example
// export async function getServerSideProps() {
//     let body = JSON.stringify({ recipeId: "485365" });
//     const res = await fetch("http://localhost:8000/api/query/getRecipebyId", {
//       method: "post",
//       body: body,
//       headers: { "Content-Type": "application/json" },
//     });
  
//     const data = await res.json();
  
//     return {
//       props: { data }
//     };
//   };