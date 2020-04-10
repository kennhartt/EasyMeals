import fetch from "node-fetch";
import Navbar from "../../components/navbar";

export default function Recipe({ data }) {
  return (
    <React.Fragment>
      <Navbar />

      <div class="container" style={{ marginTop: 100 }}>
        <div class="table">
          <h1>{data.title}</h1>
          <hr />
          <div class="row fixed">
            <div class="col rounded">
              <p>
                <img class="rounded" src={data.image} />
              </p>
            </div>
            <div class="col rounded">
              <h1 class="h5">Ingredients</h1>
            </div>
          </div>
          <h1 class="h4 border-bottom" style={{ paddingBottom: 10 }}>
            Instructions
          </h1>
          <p>{data.instructions}</p>
          <hr />
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps({ query }) {
  const { recipeId } = query;
  const res = await fetch(
    `http://localhost:8000/api/query/getRecipebyId/${recipeId}`
  );
  const data = await res.json();

  return {
    props: { data },
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
