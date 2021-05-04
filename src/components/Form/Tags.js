import React, { useEffect, useState, useCallback } from "react";
import { Field, actions } from "react-redux-form";
import { connect } from "react-redux";

function Tags(props) {
    const [buttonsEnabled, setButtonsEnabled] = useState(false);
    const { dispatch } = props;
    const recipe = props.recipe;

    const onRemoveClick = (i) => {
        removeTag(i);
        updateButtonState();
    };

    const onAddClick = () => {
        addTag();
        updateButtonState();
    };

    const removeTag = (i) => {
        dispatch(actions.remove("recipe.tags", i))
    }

    const addTag = (i) => {
        dispatch(actions.push("recipe.tags", ""))
    }

    const updateButtonState = useCallback(() => {
        if (recipe.tags.length !== 1) {
          setButtonsEnabled(true)
        } else if (recipe.tags.length === 1) {
          setButtonsEnabled(false)
        }
      }, [recipe.tags.length]);

    useEffect(() => {
        updateButtonState()
    }, [updateButtonState])
    
    return (
      <div>
        <label htmlFor="recipe.tags">Kategori: </label>
        {recipe.tags.map((tag, i) => (
          <Field
            className="ui fluid action input"
            style={{ paddingTop: 5, paddingBottom: 5 }}
            model={`recipe.tags[${i}]`}
            key={i}
          >
            <input type="text" defaultValue="" />
            <button
              disabled={!buttonsEnabled}
              className="ui red icon button"
              onClick={() => onRemoveClick(i)}
            >
              <i className="trash icon"></i>
            </button>
          </Field>
        ))}
        <div>
        <button
            className="positive ui labeled icon button"
            style={{ marginTop: 10 }}
            onClick={() => onAddClick()}
          >
            <i className="plus icon" />
            Lägg till kategori
          </button>
        </div>
      </div>
    );
}

export default connect((s) => s)(Tags);
