import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, actions } from "react-redux-form";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import Name from "../form/Name";
import Description from "../form/Description";
import Ingredients from "../form/Ingredients";
import Steps from "../form/Steps";
import Tags from "../form/Tags";
import Source from "../form/Source";

function Editmodal(props) {
  const [open, setOpen] = useState(props.modal);
  const [recipeLoaded, setRecipeLoaded] = useState();
  const [file, setFile] = useState();
  const [previewFile, setPreviewFile] = useState();
  const { dispatch } = props;

  const closeModal = () => {
    setOpen(false);
    props.onChange(false);
    dispatch(actions.reset('recipe'))
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (recipe) => {
    if (!file) {
      updateRecipeNoNewImage(recipe);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        updateRecipeNewImage(reader.result, recipe);
      };
      reader.onerror = () => {
        console.error("Something went wrong!");
        //setErrMsg("Something went wrong!");
      };
    }
  };

  const updateRecipeNewImage = async (base64EncodedImage, recipe) => {
    const recipeId = recipe._id; 

    try {
      await axios("https://xentras-recipe-backend.herokuapp.com/recipe/upload", {
        method: "POST",
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(response.data.url);
        const imageURL = response.data.url;
        const recipeSend = {
          name: recipe.name,
          source: recipe.source,
          description: recipe.description,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          tags: recipe.tags,
          imageURL: imageURL,
        };

        axios
          .patch("https://xentras-recipe-backend.herokuapp.com/recipe/" + recipeId, recipeSend)
          .then((response2) => {
            console.log("Recipe updated");
            if (response2.status === 201) {
              console.log(response2);
              props.onUpdate(true);
              // this.setState({ visible: true, success: true });
            }
          })
          .catch((err) => {
            // this.setState({ visible: true, success: false });
            console.error(err);
          });
      });
      //setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      //setErrMsg("Something went wrong!");
    }
  };

  const updateRecipeNoNewImage = async (recipe) => {
    const recipeId = recipe._id;
    const recipeSend = {
      name: recipe.name,
      source: recipe.source,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      tags: recipe.tags,
      imageURL: recipe.imageURL,
    };

    console.log(recipeSend);
    try {
      await axios
        .patch("https://xentras-recipe-backend.herokuapp.com/recipe/" + recipeId, recipeSend)
        .then((response) => {
          console.log(response);
          props.onUpdate(true);
        });
        //setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      //setErrMsg("Something went wrong!");
    }
  };

  useEffect(() => {
    const loadRecipe = async () => {
      await dispatch(actions.load("recipe", props.recipes));
      await setRecipeLoaded(props.recipe);
      // console.log(recipeLoaded);
    };
    loadRecipe();
  }, [recipeLoaded]);

  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Uppdatera recept</Modal.Header>
      <Modal.Content>
        {recipeLoaded && (
          <Form
            className="ui container"
            model="recipe"
          >
            <div className="ui form">
              <div className="ui grid">
                <div className="two column row">
                  <div className="column">
                    <Name />
                  </div>
                  <div className="column">
                    <Source />
                  </div>
                </div>
                <div className="one column row">
                  <div className="column">
                    <Description />
                  </div>
                </div>
                <div className="one column row">
                  <div className="column">
                    <Ingredients />
                  </div>
                </div>
                <div className="three column row">
                  <div className="column">
                    <Steps />
                  </div>
                  <div className="column">
                    <Tags />
                  </div>
                  <div className="column" />
                </div>
                <div className="three column row">
                  <div className="column"></div>
                  <div className="column">
                    <div className="ui input">
                      <label
                        htmlFor="file"
                        className="positive ui labeled icon button"
                      >
                        <i className="image icon"></i>
                        Lägg till bild
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => handleChange(e)}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  <div className="column"></div>
                </div>
                <div className="on column row">
                  <div className="column" style={{ textAlign: "center" }}>
                    <img
                      className="ui medium rounded image"
                      alt=""
                      src={previewFile ? previewFile : props.recipe.imageURL}
                    />
                  </div>
                </div>
              </div>
              <button className="ui labeled icon primary button" type="submit" style={{ marginTop: 10}} onClick={() => handleSubmit(props.recipe)}>
                <i className="save icon"></i>
                Uppdatera recept!
              </button>
            </div>
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Klar"
          labelPosition="right"
          icon="checkmark"
          onClick={() => closeModal()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default connect((s) => s)(Editmodal);
