const spoonacularAPIKey = "b05207a1e079405c9d7bdafbc8f62047";

module.exports.queryByIngredient = async(req, res, next) => {
    try {
        let ingredient, maxNumberOfResults = 5;
        let request = require("request");

        if(true) {
            ingredient = req.body.ingredient;
            let options = {
                url: `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularAPIKey}&query=${ingredient}&number=${maxNumberOfResults}`
            }

            request.get(options, async(error, response) => {
                let bodyJson = JSON.parse(response.body);
                res.send(bodyJson);
            })
        }
    } catch (err) {
        return next(err);
    }
}