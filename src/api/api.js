import axios from "axios";

const getThumbnail = async (text) => {
  return await axios.get(
    "https://xentras-recipe-backend.herokuapp.com/recipe/thumbnail/" + text,
    {}
  );
};

const getRecipe = async () => {
  return await axios.get(
    "https://xentras-recipe-backend.herokuapp.com/recipe/",
    {}
  );
}

export { getThumbnail, getRecipe };
