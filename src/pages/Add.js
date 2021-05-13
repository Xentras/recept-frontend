import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import { BrowserView, MobileView } from "react-device-detect";
import { postUploadImage, postRecipe } from "../api/api.js";
import Tags from "../components/Form/Tags.js";
import Steps from "../components/Form/Steps.js";
import Name from "../components/Form/Name.js";
import Description from "../components/Form/Description.js";
import Source from "../components/Form/Source.js";
import Ingredient from "../components/Form/Ingredients/Ingredients.js";
import CustomErrorMessage from "../components/Common/CustomErrorMessage/CustomErrorMessage.js";
import * as Yup from "yup";

function Add() {
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const { addToast } = useToasts();

  const initialRecipeState = {
    name: "",
    source: "",
    description: "",
    ingredients: [
      {
        size: "",
        ingredient: [{ amount: "", unit: "", name: "", subcategory: "" }],
      },
    ],
    steps: [""],
    tags: [""],
    file: "",
    previewFile: "",
  };

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
    file: Yup.string().required("Obligatoriskt med bild"),
  });

  // This function will run if the user adds an image to the recipe
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  // This function is used when the user submits the recipe
  // it will first try and read the image that the user is trying to add
  // if that works it will try and sumbit the recipe
  const handleSubmit = (values) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      postNewRecipe(reader.result, values);
    };
    reader.onerror = () => {
      addToast("Något gick fel vid inläsning av ny bild", {
        appearance: "error",
      });
    };
  };

  // This function is used when a user submits the recipe
  const postNewRecipe = async (base64EncodedImage, values) => {
    const response = await postUploadImage(base64EncodedImage);
    await postRecipe(values, response)
      .then(() => {
        addToast("Receptet har Sparats!", { appearance: "success" });
      })
      .catch((error) => {
        addToast(
          "Det gick inte att spara receptet, följande fel uppstod: " +
            error.message,
          { appearance: "error" }
        );
      });
  };

  return (
    <Formik
      initialValues={initialRecipeState}
      validationSchema={DisplayingErrorMessagesSchema}
      validateOnBlur={false}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, setFieldValue }) => (
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
                  <Ingredient values={values} />
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
                      onChange={(e) => {
                        handleImageChange(e);
                        setFieldValue("file", e.currentTarget.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div>
                    <CustomErrorMessage name={"previewFile"} />
                  </div>
                  <div style={{ marginTop: "10%" }}>
                    <img
                      className="ui left medium image"
                      alt=""
                      src={previewImage}
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
                  >
                    <i className="save icon"></i>
                    Spara recept!
                  </button>
                </div>
              </div>
            </div>
            <div style={{ height: 100 }}></div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Add;
