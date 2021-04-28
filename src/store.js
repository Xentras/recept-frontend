import { createStore, applyMiddleware } from "redux";
import { combineForms } from "react-redux-form";
import thunk from "redux-thunk";

const initialRecipeState = {
  name: "",
  source: "",
  description: "",
  // ingredients: [{ name: '', amount: '', unit: '', subcategory: '' }],
  ingredients: [
    {
      size: "",
      ingredient: [{ amount: "", unit: "", name: "", subcategory: "" }],
    },
  ],
  steps: [{ step: "" }],
  tags: [{ tag: "" }],
  file: "",
  previewFile: "",
};

const store = createStore(
  combineForms({
    recipe: initialRecipeState,
  }),
  applyMiddleware(thunk)
);

export default store;
