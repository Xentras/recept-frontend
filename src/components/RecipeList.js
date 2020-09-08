import React from 'react';

const RecipeList = (props) => {
    const recipe = props.recipes.map(({name, tags, steps, ingredients, description}, i) => {
        return <div key={i} className="card">
                    <div className="card-body">
                        <h1>{name}</h1>
                        <ul>
                            {tags.map((tag, j) => {
                                return <li key={j}>Tag-{j} = {tag}</li>
                            })}
                        </ul>
                        <ul>
                            {steps.map((step, j) => {
                                return <li key={j}>Step-{j} = {step}</li>
                            })}
                        </ul>
                        <ul>
                            {ingredients.map((ingredient, j) => {
                                return <li key={j}>ingredient-{j} = {ingredient}</li>
                            })}
                        </ul>
                        <p>Description = {description}</p>
                    </div>
                </div>
        })
    return <div>{recipe}</div>;
}

export default RecipeList;