import axios from "axios";

// This is the request that returns all the recipes with a thumbnail
// This is used when a user searches for a recipe
const getThumbnail = async (text) => {
  return await axios.get(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/thumbnail/" + text,
    {}
  );
};

// This is the request that returns a specific recipe with all information
// This is used when a user selects a recipe from the search results or after they have updated an existing recipe
const getRecipe = async (recipeName) => {
  return await axios.get(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/" + recipeName,
    {}
  );
};

const postUploadImage = async (base64EncodedImage) => {
  return await axios(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/upload",
    {
      method: "POST",
      data: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-Type": "application/json" },
    }
  );
};

const postRecipe = async (recipe, response) => {
  const recipeSend = {
    name: recipe.name,
    source: recipe.source,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tags: recipe.tags,
    imageURL: response.data.secure_url,
  };
  return await axios.post("https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/", recipeSend)
}

const patchRecipeNoNewImage = async (recipe) => {
  const recipeId = recipe._id;
  const recipeSend = {
    name: recipe.name,
    source: recipe.source,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tags: recipe.tags,
    imageURL: recipe.imageURL,
  };

  return await axios.patch(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/" + recipeId,
    recipeSend
  );
};

const patchRecipeNewImage = async (recipe, response) => {
  const recipeId = recipe._id;
  const recipeSend = {
    name: recipe.name,
    source: recipe.source,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tags: recipe.tags,
    imageURL: response.data.secure_url,
  };

  return await axios.patch(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/" + recipeId,
    recipeSend
  );
};

const checkGoogleLoggin = async () => {
  return await axios.get(
    "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + sessionStorage.getItem("token")
  );
}

export {
  getThumbnail,
  getRecipe,
  postUploadImage,
  postRecipe,
  patchRecipeNoNewImage,
  patchRecipeNewImage,
  checkGoogleLoggin
};
