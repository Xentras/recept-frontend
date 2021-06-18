import React, { useState, useRef } from "react";
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
  patchRecipeNoNewImage,
  patchRecipeNewImage,
} from "../../api/api.js";
import * as Yup from "yup";

function EditRecipeModal(props) {
  const submitButtonRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const { addToast } = useToasts();
  const open = props.modal;
  const savedState = props.recipes;
  const formRef = useRef()

  // This function will run when the user closes the modal
  // it will tell "recipe.js" that it is closed
  const closeEditRecipeModal = () => {
    props.onChange(false);
  };

  const submitFromOutsideForm = () => {
    submitButtonRef.current.click()
    if (formRef.current) {
      if(!formRef.current.isValid) {
        addToast("Något obligatoriskt fält saknar text!", {
          appearance: "warning",
        });
      } 
    }
  }

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required("Obligatoriskt fält"),
    ingredients: Yup.array().of(
      Yup.object().shape({
        size: Yup.string().required("Obligatoriskt fält"),
        ingredient: Yup.array().of(
          Yup.object().shape({
            amount: Yup.string().required("Obligatoriskt fält"),
            name: Yup.string().required("Obligatoriskt fält"),
          })
        ),
      })
    ),
    steps: Yup.array()
      .of(Yup.string().required("Obligatoriskt fält"))
      .strict()
      .required(),
    tags: Yup.array()
      .of(Yup.string().required("Obligatoriskt fält"))
      .strict()
      .required(),
  });

  // This function will run if the user changes the image for the recipe
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  // This function is used when the user updates the recipe
  const handleSubmit = (values) => {
    // Check if the user changed the image for the recipe or not
    if (!image) {
      updateRecipeNoNewImage(values);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        updateRecipeNewImage(reader.result, values);
      };
      reader.onerror = () => {
        addToast("Något gick fel vid inläsning av ny bild", {
          appearance: "error",
        });
      };
    }
  };

  // This function is used when a user submits a update to a recipe and the image has also been updated
  const updateRecipeNewImage = async (base64EncodedImage, values) => {
    setIsSubmitting(true)
    await patchRecipeNewImage(values, base64EncodedImage, sessionStorage.getItem("token"))
      .then(() => {
        props.onUpdate(true);
        closeEditRecipeModal();
        addToast("Receptet har uppdaterats!", { appearance: "success" });
      })
      .catch((error) => {
        setIsSubmitting(false)
        addToast(
          "Det gick inte att uppdatera receptet, följande fel uppstod: " +
            error.message,
          { appearance: "error" }
        );
      });
  };

  // This function is used whena  user submits a update without changeing the image
  const updateRecipeNoNewImage = async (values) => {
    setIsSubmitting(true)
    await patchRecipeNoNewImage(values, sessionStorage.getItem("token"))
      .then(() => {
        props.onUpdate(true);
        closeEditRecipeModal();
        addToast("Receptet har uppdaterats!", { appearance: "success" });
      })
      .catch((error) => {
        setIsSubmitting(false)
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
          enableReinitialize={true}
          initialValues={savedState}
          validationSchema={DisplayingErrorMessagesSchema}
          validateOnBlur={true}
          validateOnMount={true}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
          innerRef={formRef}
        >
          {({ values, setFieldValue, handleBlur }) => (
            <Form className="ui container">
              <div className="ui form">
                <div className="ui grid">
                  <div className="two column row">
                    <div className="column">
                      <Name
                        handleBlur={handleBlur}
                        values={values.name}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className="column">
                      <Source
                        handleBlur={handleBlur}
                        values={values.source}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                  <div className="one column row">
                    <div className="column">
                      <Description
                        handleBlur={handleBlur}
                        values={values.description}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                  <div className="one column row">
                    <div className="column">
                      <Ingredients
                        handleBlur={handleBlur}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                  <div className="three column row">
                    <div className="eight wide column">
                      <Steps handleBlur={handleBlur} values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div className="column">
                      <Tags handleBlur={handleBlur} values={values} setFieldValue={setFieldValue} />
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
                            previewImage ? previewImage : props.recipes.imageURL
                          }
                        />
                      </div>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                  </div>
                  <div className="one column row">
                  <button
                    className="ui labeled icon primary button"
                    type="submit"
                    disabled={isSubmitting}
                    ref={submitButtonRef}
                  >
                    <i className="save icon"></i>
                    Uppdatera recept
                  </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          content="Uppdatera recept"
          labelPosition="right"
          icon="save"
          disabled={isSubmitting}
          onClick={() => submitFromOutsideForm()}
          primary
        />
        <Button
          content="Stäng"
          labelPosition="right"
          icon="close"
          onClick={() => closeEditRecipeModal()}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
}

export default EditRecipeModal;
