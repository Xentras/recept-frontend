import React from "react";
import { Control } from "react-redux-form";

export default function Source() { 
    return (
      <div>
        <label htmlFor="recipe.source">Source: </label>
        <Control.text model="recipe.source" id="recipe.source" />
      </div>
    );
}
