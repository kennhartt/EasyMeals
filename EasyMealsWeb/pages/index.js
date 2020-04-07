import fetch from 'isomorphic-unfetch';

const Index = props => (
    <h1>Hello</h1>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:8000/api/query/getRecipeById', {
      method: 'POST',
      headers: {
          'Content-Type': 'application-json'
      },
      body: JSON.stringify({'recipeId': '485365'})
  });
  const data = await res.json();

  console.log(data);

  return {
    data
  };
};

export default Index;
