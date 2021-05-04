import React from "react";
import { Control } from "react-redux-form";

function Description() { 
    return (
      <div className="field">
        <label htmlFor="recipe.description">Beskrivning: </label>
        <Control.textarea model="recipe.description" id="recipe.description" />
      </div>
    );
}

export default Description;