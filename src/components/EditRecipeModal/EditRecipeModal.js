import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Button, Modal } from "semantic-ui-react";
import { Formik, Form } from "formik";
import Name from "../Form/Name";
import Description from "../Form/Description";
import Ingredients from "../Form/Ingredients/Ingredients";
import Steps from "../Form/Steps";
import Tags from "../Form/Tags";
import Source from "../Form/Source";
import {
  postUploadImage,
  patchRecipeNoNewImage,
  patchRecipeNewImage,
} from "../../api/api.js";

function EditRecipeModal(props) {
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const { addToast } = useToasts();
  const open = props.modal;
  const savedState = props.recipes;

  // This function will run when the user closes the modal
  // it will tell "recipe.js" that it is closed
  const closeEditRecipeModal = () => {
    props.onChange(false);
  };

  // This function will run if the user changes the image for the recipe
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  // This function is used when the user updates the recipe
  const handleSubmit = (recipe) => {
    // Check if the user changed the image for the recipe or not
    if (!image) {
      updateRecipeNoNewImage(recipe);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        updateRecipeNewImage(reader.result, recipe);
      };
      reader.onerror = () => {
        addToast("Något gick fel vid inläsning av ny bild", {
          appearance: "error",
        });
      };
    }
  };

  // This function is used when a user submits a update to a recipe and the image has also been updated
  const updateRecipeNewImage = async (base64EncodedImage, recipe) => {
    const response = await postUploadImage(base64EncodedImage);
    await patchRecipeNewImage(recipe, response)
      .then(() => {
        props.onUpdate(true);
        closeEditRecipeModal();
        addToast("Receptet har uppdaterats!", { appearance: "success" });
      })
      .catch((error) => {
        addToast(
          "Det gick inte att uppdatera receptet, följande fel uppstod: " +
            error.message,
          { appearance: "error" }
        );
      });
  };

  // This function is used whena  user submits a update without changeing the image
  const updateRecipeNoNewImage = async (recipe) => {
    await patchRecipeNoNewImage(recipe)
      .then(() => {
        props.onUpdate(true);
        closeEditRecipeModal();
        addToast("Receptet har uppdaterats!", { appearance: "success" });
      })
      .catch((error) => {
        addToast(
          "Det gick inte att uppdatera receptet, följande fel uppstod: " +
            error.message,
          { appearance: "error" }
        );
      });
  };

  return (
    <Modal
      onClose={() => closeEditRecipeModal()}
      open={open}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Uppdatera recept</Modal.Header>
      <Modal.Content image scrolling>
        <Formik
          initialValues={savedState}
          validateOnBlur={false}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="ui container">
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
                      <Ingredients values={values} />
                    </div>
                  </div>
                  <div className="three column row">
                    <div className="eight wide column">
                      <Steps values={values} />
                    </div>
                    <div className="column">
                      <Tags values={values} />
                    </div>
                  </div>
                  <div className="three column row">
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
                            onChange={(e) => handleImageChange(e)}
                            style={{ display: "none" }}
                          />
                        </div>
                        <div style={{ marginTop: "10%" }}>
                          <img
                            className="ui left rounded image"
                            alt=""
                            src={
                              previewImage
                                ? previewImage
                                : props.recipes.imageURL
                            }
                          />
                        </div>
                    </div>
                    <div className="column">
                    </div>
                    <div className="column"></div>
                  </div>
                  <div className="one column row">
                    <div className="column">
                      <button
                        className="ui labeled icon primary button"
                        type="submit"
                      >
                        <i className="save icon"></i>
                        Spara recept!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Klar"
          labelPosition="right"
          icon="checkmark"
          onClick={() => closeEditRecipeModal()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditRecipeModal;
