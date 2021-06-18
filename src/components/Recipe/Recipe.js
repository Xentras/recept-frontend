import React, { useEffect, useState } from "react";
import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications';
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal.js";
import {LoadingSpinner} from "../Common/LoadingSpinner/LoadingSpinner.js"
import RecipeContent from "./RecipeContent.js"
import { getRecipe } from "../../api/api.js";
import _ from "lodash";

function Recipe(props) {
  const [recipe, setRecipe] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [showModal, setShowEditRecipeModal] = useState(false);
  const [stateLoaded, setStateLoaded] = useState(false);
  const [reloadRecipe, setReloadRecipe] = useState(true);
  const [dropdownSizeOptions, setDropdownSizeOptions] = useState();
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const recipeName = props.thumbnail?._id || props.thumbnail;
  
  let id = window.location.href || undefined;
  if(id) {
    id = id.substring(id.lastIndexOf("/") + 1);
  }

  // This function is used when opening the modal
  const openEditRecipeModal = () => {
    setShowEditRecipeModal(true);
  };

  // This function is used when closing the modal
  function closeEditRecipeModal() {
    setShowEditRecipeModal(false);
  }

  // This function is used when the user updates the recipe
  const handleUpdate = () => {
    setReloadRecipe(true);
    setStateLoaded(false);
  };

  // This function is used when the user clicks on the back button
  // If they come from "add.js" the back button will send the user to search page
  function backButtonClick() {
      props.history.push("/")
  }

  // This function will make sure that the toast message is always visible
  const MyCustomToastContainer = props => (
    <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
  );

  // This useEffect will retrive information about a specific recipe and add it to different variables
  // it will be triggered when recipeName is set and everytime reloadRecipe is changed
  useEffect(() => {
    const loadRecipe = async () => {
      if (reloadRecipe === true) {
        let response = "";
        if(id) {
          response = await getRecipe(id);
        } else {
          response = await getRecipe(recipeName);
        }
        
        setRecipe(response.data[0]);
        // This will create a list with different size/portion options used in the dropdown
        setDropdownSizeOptions(
          response.data[0].ingredients.map((portion, i) => ({
            value: i,
            text: portion.size + " Personer",
          }))
        );
        // This will create different lists of ingredients based on categories inside the recipe
        setIngredientList(
          _.chain(response.data[0].ingredients[0].ingredient)
            // Group the elements of Array based on `subcategory` property
            .groupBy("subcategory")
            // `key` is group's name (subcategory), `value` is the array of objects
            .map((value, key) => ({ subcategory: key, ingredients: value }))
            .value()
        );
        setStateLoaded(true);
        setReloadRecipe(false)
      }
    };
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.user);
      if (recipe.googleId === user.googleId) {
        setShowUpdateButton(true);
      }
    }
    loadRecipe();
  }, [recipeName, reloadRecipe]);

  return (
    <div className="ui container">
      <div>
        <button
          style={{ margin: 15, marginLeft: 0 }}
          className="ui labeled icon button"
          onClick={() => backButtonClick()}
        >
          <i className="left chevron icon"></i>Tillbaka
        </button>
        {showUpdateButton && (
          <button
            className="ui primary labeled icon button"
            onClick={() => openEditRecipeModal()}
          >
            <i className="edit chevron icon"></i>Uppdatera receptet
          </button>
        )}
      </div>
      <div className="ui grid">
        {stateLoaded ? (
          <RecipeContent
            recipe={recipe}
            ingredientList={ingredientList}
            dropdownSizeOptions={dropdownSizeOptions}
          />
        ) : (
          <LoadingSpinner size={"medium"} />
        )}
        <ToastProvider
          components={{ ToastContainer: MyCustomToastContainer }}
          placement="top-center"
          autoDismiss
        >
          {showModal && (
            <EditRecipeModal
              recipes={recipe}
              modal={showModal}
              onChange={closeEditRecipeModal}
              onUpdate={handleUpdate}
            />
          )}
        </ToastProvider>
      </div>
    </div>
  );
}

export default Recipe;