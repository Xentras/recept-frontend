import React from "react";
import { Control } from "react-redux-form";

export default function Name() { 
    return (
      <div>
        <label htmlFor="recipe.name">Namn: </label>
        <Control.text model="recipe.name" id="recipe.name" />
      </div>
    );
}
