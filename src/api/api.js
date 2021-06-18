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

const postRecipe = async (recipe, token, user, base64EncodedImage) => {
  const response = await axios(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/upload",
    {
      method: "POST",
      data: JSON.stringify({ data: base64EncodedImage }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    }
  );
  const obj = JSON.parse(user);
  const recipeSend = {
    name: recipe.name,
    source: recipe.source,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tags: recipe.tags,
    imageURL: response.data.secure_url,
    googleId: obj.googleId,
  };
  return await axios(
    "https://" + process.env.REACT_APP_API_KEY + ".herokuapp.com/recipe/",
    {
      method: "POST",
      data: recipeSend,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    }
  );
};

const patchRecipeNoNewImage = async (recipe, token) => {
  const recipeId = recipe._id;
  const recipeSend = {
    name: recipe.name,
    source: recipe.source,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tags: recipe.tags,
    imageURL: recipe.imageURL,
    googleId: recipe.googleId,
  };

  return await axios(
    "https://" +
      process.env.REACT_APP_API_KEY +
      ".herokuapp.com/recipe/" +
      recipeId,
    {
      method: "PATCH",
      data: recipeSend,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access": sessionStorage.getItem("accessToken"),
      },
    }
  );
};

const patchRecipeNewImage = async (recipe, base64EncodedImage, token) => {
  let url = recipe.imageURL;
  let imageId = url.substr(url.lastIndexOf("/") + 1);
  imageId = imageId.substr(0, imageId.lastIndexOf("."));

  const recipeId = recipe._id;
  const recipeSend = {
    name: recipe.name,
    source: recipe.source,
    description: recipe.description,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tags: recipe.tags,
    imageURL: recipe.imageURL,
    googleId: recipe.googleId,
    imageId: imageId,
    data: base64EncodedImage,
  };

  return await axios(
    "http://" +
      process.env.REACT_APP_API_KEY +
      ".herokuapp.com/recipe/image/" +
      recipeId,
    {
      method: "PATCH",
      data: recipeSend,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access": sessionStorage.getItem("accessToken"),
      },
    }
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
  postRecipe,
  patchRecipeNoNewImage,
  patchRecipeNewImage,
  checkGoogleLoggin
};
