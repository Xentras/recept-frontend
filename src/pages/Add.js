import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import { BrowserView, MobileView } from "react-device-detect";
import { postRecipe } from "../api/api.js";
import Tags from "../components/Form/Tags.js";
import Steps from "../components/Form/Steps.js";
import Name from "../components/Form/Name.js";
import Description from "../components/Form/Description.js";
import Source from "../components/Form/Source.js";
import Ingredient from "../components/Form/Ingredients/Ingredients.js";
import CustomErrorMessage from "../components/Common/CustomErrorMessage/CustomErrorMessage.js";
import * as Yup from "yup";
import { SearchContext } from "../Context/SearchContext.js";

function Add(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [redirect, setRedirect] = useState(false);
  const [response, setResponse] = useState();
  const { addToast } = useToasts();
  const state = useContext(SearchContext);

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
    setIsSubmitting(true);
    await postRecipe(
      values,
      sessionStorage.getItem("token"),
      sessionStorage.getItem("user"),
      base64EncodedImage
    )
      .then((res) => {
        setResponse(res.data);
        setRedirect(true);
      })
      .catch((error) => {
        addToast(
          "Det gick inte att spara receptet, följande fel uppstod: " +
            error.message,
          { appearance: "error" }
        );
      });
    setIsSubmitting(false);
  };

  useEffect(() => {
    state.setSearch("", false);

    return;
  }, []);

  if (redirect) {
    props.history.push("/recept/" + response._id);
  }

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
              <div className="two column row">
                <div className="column">
                  <div className="ui segment">
                    <div
                      className="ui input"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <label htmlFor="file" className="ui labeled icon button">
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
                    {previewImage ? (
                      <div style={{ marginTop: "5%" }}>
                        <img
                          className="ui centered medium image"
                          alt=""
                          src={previewImage}
                        />
                      </div>
                    ) : (
                      <div className="ui icon message">
                        <i className="image outline icon" />
                        <div className="content">
                          <div className="header">
                            Lägg till en bild på receptet!
                          </div>
                          <p>Det går bara att ladda upp en bild.</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <CustomErrorMessage name={"file"} />
                  </div>
                </div>
                <div className="column"></div>
              </div>
              <div className="one column row">
                <div className="column">
                  {isSubmitting ? (
                    <button
                      className="ui labeled loading icon primary button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <i className="save icon"></i>
                      Spara recept!
                    </button>
                  ) : (
                    <button
                      className="ui labeled icon primary button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <i className="save icon"></i>
                      Spara recept!
                    </button>
                  )}
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
