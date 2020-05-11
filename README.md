# EasyMeals
EasyMeals started as a class project, Project-Final-HTML branch was the final version for the class. The backend was done by Ozgen (RollingOnion) Tastan and the frontend design was done by https://github.com/kennhartt. We are currently working on converting the same idea with improved functionality to a React with Next.js frontend for web and MongoDB-Express-Node.js stack for our custom backend server.

# OLD VERSION 
https://easymeals-csis3275.herokuapp.com/

Our first version simply allowed visitors to search for recipes using natural language. Visitors also had the ability to sign up to our website so they can save their favorite recipes. We have used an external api (https://spoonacular.com/) for our recipe database and search queries. Our frontend used basic HTML with JQuery while our backend used MongoDB-Express-Node.js. Although we were using an external api for the main content in the website, we have still decided to use our own backend to communicate with the external api since we also wanted some user functionality in our website. Users existed in our MongoDB and we have used a custom JWT token for user authorization.

# NEW VERSION
We are currently in the process of remaking our website. We wanted to completely rewrite our frontend and convert it to React (with Next.js) since we wanted to experience using modern technologies. While our backend stays mostly the same, there are few but important changes. We have moved on from using our own authentication and switched to Firebase Authentication since we wanted to use a modern authentication system with OAuth. Also since we started using next.js, we have moved our routing from the express backend to our next.js frontend while keeping our API on the backend server. While the authentication is completed on the backend side, it is still not 100% complete on the frontend. Also, we are adding new API endpoints so we can use our own database to store custom recipes while slowly moving away from the external api we have used before. Unfortunately, we had to halt working on this project for the last few weeks for personal reasons, but here are some things that we want to add in the future.

- Allow users to add, edit, save recipes.
- Allow recipes to be private or public.
- Have user profiles that includes users recipes or their own custom collection of recipes.
- Allow comments on recipes.
- Make a more robust search system that has ingredient, cuisine, diet filters.

