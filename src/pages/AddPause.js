import React, { useState, Fragment } from "react";

export default function Add() {
  const [inputFields, setInputFields] = useState([
    { ingredients: '' }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ ingredients: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "ingredients") {
      values[index].ingredients = event.target.value;
    } 
    setInputFields(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  return (
    <>
      <h1>Dynamic Form Fields in React</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
        <label htmlFor="ingredients">Ingredienser</label>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="ingredients"
                  name="ingredients"
                  value={inputField.ingredients}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};


[
  {
    "ingredients": "Lök"
  },
  {
    "ingredients": "Korv"
  },
  {
    "ingredients": "Salt"
  }
]