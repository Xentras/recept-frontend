import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import { isBrowser, isMobile } from "react-device-detect";
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
import trimData from "../helper/FormatData/FormatData.js";
import CheckValue from "../helper/CheckValue/CheckValue.js";
import CheckImage from "../helper/CheckImage/CheckImage.js";
import {LoadingSpinner} from "../components/Common/LoadingSpinner/LoadingSpinner.js"

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
  const handleImageChange = (e, setFieldValue) => {
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
      await postRecipe(
        formatedData,
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
    }
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
        <Form className="ui container" style={{ marginTop: "15px" }}>
          {!isSubmitting ? <div className="ui form">
            <div className="ui grid">
              <div className={isBrowser ? "two column row" : "one column row"}>
                {isMobile && (
                  <div className="column">
                    <div className="ui yellow icon message">
                      <i className="info icon" />
                      <div className="content">
                        <div className="header">
                          Det är lättare att lägga till recept från datorn!
                        </div>
                        <p>
                          På datorn kan man få en bättre användarupplevelse
                          jämfört med mobil.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="column"
                  style={isBrowser ? {} : { marginTop: "10px" }}
                >
                  <Name />
                </div>
                <div
                  className="column"
                  style={isBrowser ? {} : { marginTop: "10px" }}
                >
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
              <div
                className={isBrowser ? "three column row" : "one column row"}
              >
                <div className={isBrowser ? "eight wide column" : "column"}>
                  <Steps values={values} />
                </div>
                <div
                  className="column"
                  style={isBrowser ? {} : { marginTop: "10px" }}
                >
                  <Tags values={values} />
                </div>
              </div>
              <div className={isBrowser ? "two column row" : "one column row"}>
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
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          handleImageChange(e, setFieldValue);
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
          </div> : <LoadingSpinner size={'medium'} text={"Skapar recept, detta kan ta några sekunder"}/>}
        </Form>
      )}
    </Formik>
  );
}

export default Add;
