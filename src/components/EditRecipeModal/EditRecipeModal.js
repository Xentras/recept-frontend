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
import { patchRecipeNoNewImage, patchRecipeNewImage } from "../../api/api.js";
import * as Yup from "yup";
import CheckImage from "../../helper/CheckImage/CheckImage.js";
import trimData from "../../helper/FormatData/FormatData.js";
import CheckValue from "../../helper/CheckValue/CheckValue.js";
import { isBrowser, isMobile } from "react-device-detect";

function EditRecipeModal(props) {
  const submitButtonRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const { addToast } = useToasts();
  const open = props.modal;
  const savedState = props.recipes;
  const formRef = useRef();

  // This function will run when the user closes the modal
  // it will tell "recipe.js" that it is closed
  const closeEditRecipeModal = () => {
    props.onChange(false);
  };

  const submitFromOutsideForm = () => {
    submitButtonRef.current.click();
    if (formRef.current) {
      if (!formRef.current.isValid) {
        addToast("Något obligatoriskt fält saknar text!", {
          appearance: "warning",
        });
      }
    }
  };

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .required("Obligatoriskt fält")
      .matches(
        /^[^!#¤%/()=?¡@£$€¥{[±½§¶}\]<>^$]+$/,
        "Innehåller otillåtna tecken"
      )
      .min(2, "Måste vara minst 2 tecken långt")
      .max(40, "Får inte innehålla fler än 40 tecken"),
    source: Yup.string().max(200, "Får inte innehålla fler än 200 tecken"),
    description: Yup.string().max(500, "Får inte innehålla fler än 500 tecken"),
    ingredients: Yup.array().of(
      Yup.object().shape({
        size: Yup.string()
          .required("Obligatoriskt fält")
          .matches(/^[0-9]+$/, "Får bara innehålla siffror")
          .max(4, "Får inte innehålla fler än 4 tecken"),
        ingredient: Yup.array().of(
          Yup.object().shape({
            amount: Yup.string()
              .required("Obligatoriskt fält")
              .matches(/^[0-9,.½/]+$/, "Får bara innehålla siffror")
              .max(4, "Får inte innehålla fler än 4 tecken"),
            name: Yup.string()
              .required("Obligatoriskt fält")
              .max(30, "Får inte innehålla fler än 30 tecken"),
            subcategory: Yup.string().max(
              30,
              "Får inte innehålla fler än 30 tecken"
            ),
          })
        ),
      })
    ),
    steps: Yup.array()
      .of(
        Yup.string()
          .required("Obligatoriskt fält")
          .max(200, "Får inte innehålla fler än 200 tecken")
      )
      .strict()
      .required(),
    tags: Yup.array()
      .of(
        Yup.string()
          .required("Obligatoriskt fält")
          .max(20, "Får inte innehålla fler än 20 tecken")
      )
      .strict()
      .required(),
  });

  // This function will run if the user changes the image for the recipe
  const handleImageChange = (e) => {
    const imageCheck = CheckImage(e);

    if (imageCheck.length > 0) {
      addToast("Följande fel uppstod: " + imageCheck.join(", "), {
        appearance: "error",
      });
    } else {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setFieldValue("file", e.currentTarget.files[0]);
    }
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
    const formatedData = trimData(values);
    const errorList = CheckValue(formatedData);

    if (errorList.length > 0) {
      addToast(
        "Det gick inte att spara receptet, något av följande fält innehåller bara mellanslag " +
          errorList.join(", "),
        { appearance: "error" }
      );
    } else {
      setIsSubmitting(true);
      await patchRecipeNewImage(
        formatedData,
        base64EncodedImage,
        sessionStorage.getItem("token")
      )
        .then(() => {
          props.onUpdate(true);
          closeEditRecipeModal();
          addToast("Receptet har uppdaterats!", { appearance: "success" });
        })
        .catch((error) => {
          setIsSubmitting(false);
          addToast(
            "Det gick inte att uppdatera receptet, följande fel uppstod: " +
              error.message,
            { appearance: "error" }
          );
        });
    }
  };

  // This function is used whena  user submits a update without changeing the image
  const updateRecipeNoNewImage = async (values) => {
    const formatedData = trimData(values);
    const errorList = CheckValue(formatedData);

    if (errorList.length > 0) {
      addToast(
        "Det gick inte att spara receptet, något av följande fält innehåller bara mellanslag " +
          errorList.join(", "),
        { appearance: "error" }
      );
    } else {
      setIsSubmitting(true);
      await patchRecipeNoNewImage(formatedData, sessionStorage.getItem("token"))
        .then(() => {
          props.onUpdate(true);
          closeEditRecipeModal();
          addToast("Receptet har uppdaterats!", { appearance: "success" });
        })
        .catch((error) => {
          setIsSubmitting(false);
          addToast(
            "Det gick inte att uppdatera receptet, följande fel uppstod: " +
              error.message,
            { appearance: "error" }
          );
        });
    }
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
          {({ values }) => (
            <Form className="ui container">
              <div className="ui form">
                <div className="ui grid">
                  <div
                    className={isBrowser ? "two column row" : "one column row"}
                  >
                    {isMobile && (
                      <div className="column">
                        <div className="ui yellow icon message">
                          <i className="info icon" />
                          <div className="content">
                            <div className="header">
                              Det är lättare att uppdatera recept på datorn!
                            </div>
                            <p>
                              På datorn kan man få en bättre användarupplevelse
                              jämfört med mobil.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="column" style={isBrowser ? {} : { marginTop: "10px" }}>
                      <Name />
                    </div>
                    <div className="column" style={isBrowser ? {} : { marginTop: "10px" }}>
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
                  <div className={isBrowser ? "three column row" : "one column row"}>
                    <div className={isBrowser ? "eight wide column" : "column"}>
                      <Steps values={values} />
                    </div>
                    <div className="column" style={isBrowser ? {} : { marginTop: "10px" }}>
                      <Tags values={values} />
                    </div>
                  </div>
                  <div className={isBrowser ? "three column row" : "one column row"}>
                    <div className="column">
                      <div className="ui input">
                        <label
                          htmlFor="file"
                          className="positive ui labeled icon button"
                        >
                          <i className="image icon"></i>
                          Ändra bild
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
                    <div className="column">
                      <button
                        className="ui labeled icon primary button"
                        type="submit"
                        disabled={isSubmitting}
                        ref={submitButtonRef}
                      >
                        <i className="save icon"></i>
                        {isBrowser ? "Uppdatera recept" : "Uppdatera"}
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
          type="submit"
          content={isBrowser ? "Uppdatera recept" : "Uppdatera"}
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
