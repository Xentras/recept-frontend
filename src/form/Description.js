import React from "react";
import { Control } from "react-redux-form";

export default function Description() { 
    return (
      <div>
        <label htmlFor="recipe.description">Description: </label>
        <Control.textarea model="recipe.description" id="recipe.description" />
      </div>
    );
}
