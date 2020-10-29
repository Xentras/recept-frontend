import React, { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "./EditModal.js";
import _ from 'lodash';

export default function RecipeList(props) {
  const [recipe, setRecipe] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stateLoaded, setStateLoaded] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState();
  const recipeName = props.thumbnail.name;

  const openModal = () => {
    setShowModal(true);
  };

  const handleUpdate = () => {
    setUpdateRecipe(true);
    setStateLoaded(false);
    // console.log("handleUpdate changed")
  }

  const checkValue = (subcategory) => {
    if(subcategory === "undefined") {
      return "Övrigt";
    } else {
      return subcategory;
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  function backClick() {
    // console.log(ingredientList)
    // console.log(recipe)
    props.onChange(true);
  }

  useEffect(() => {
    const loadRecipe = async () => {
      await axios
        .get("http://192.168.10.218:3005/recipe/" + recipeName)
        .then((response) => {
          // console.log("reloaded")
          setIngredientList(
            _.chain(response.data[0].ingredients)
              // Group the elements of Array based on `subcategory` property
              .groupBy("subcategory")
              // `key` is group's name (subcategory), `value` is the array of objects
              .map((value, key) => ({ subcategory: key, ingredients: value }))
              .value()
          );
          setRecipe(response.data[0]);
          setStateLoaded(true);
        });
    }
    loadRecipe();
  }, [updateRecipe])

  return (
    <div>
      <div>
        <button
          style={{ margin: 15 }}
          className="ui labeled icon button"
          onClick={() => backClick()}
        >
          <i className="left chevron icon"></i>Tillbaka
        </button>
        <button className="ui labeled icon button" onClick={() => openModal()}>
          <i className="edit chevron icon"></i>Uppdater receptet
        </button>
      </div>
      <div className="ui grid">
        {stateLoaded && (
          <div className="two column row">
            <div className="column">
              <h1>{recipe.name}</h1>
              <p>Källa: {recipe.source}</p>
              <div className="ui divider"></div>
              <p>Ingredienser:</p>
              <div className="ui list">
                {ingredientList.map((subcategory, j) => {
                  return (
                    <div className="item" key={j}>
                        <div className="header">{checkValue(subcategory.subcategory)}</div>
                        <div className="ui bulleted list"> 
                        {ingredientList[j].ingredients.map((ingredient, i) => {
                          return (
                            <div key={i} className="item">{ingredient.amount} {ingredient.unit} {ingredient.name}</div>
                          )
                        })}
                        </div>
                    </div>
                  );
                })}
              </div>
              <div className="ui divider"></div>
              <p>Steg:</p>
              <div className="ui ordered list">
                {recipe.steps.map((step, j) => {
                  return (
                    <div className="item" key={j}>
                      {step}
                    </div>
                  );
                })}
              </div>
              <div className="ui divider"></div>
            </div>
            <div className="column">
              <img
                alt=""
                src={recipe.imageURL}
                className="ui medium rounded image"
              />
              <p>
                Beskrivning: <br />
                {recipe.description}
              </p>
              <div className="ui divider"></div>
              <p>Kategori:</p>
              <div className="ui tag labels">
                {recipe.tags.map((tag, j) => {
                  return (
                    <div className="ui teal label" key={j}>
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <EditModal recipes={recipe} modal={showModal} onChange={closeModal} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
}
