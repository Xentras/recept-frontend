import React from "react";
import { Control } from "react-redux-form";

export default function Source() { 
    return (
      <div>
        <label htmlFor="recipe.source">Källa: </label>
        <Control.text model="recipe.source" id="recipe.source" />
      </div>
    );
}
