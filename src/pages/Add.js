import React, { useState } from "react";
import { useToasts } from 'react-toast-notifications';
import { Form } from "react-redux-form";
import Name from "../form/Name.js";
import Description from "../form/Description";
import Ingredients from "../form/Ingredients";
import Steps from "../form/Steps";
import Tags from "../form/Tags";
import Source from "../form/Source";
import { BrowserView, MobileView } from "react-device-detect";
import { connect } from "react-redux";
import { postUploadImage, postRecipe } from "../api/api.js";

function Add(props) {
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const { addToast } = useToasts();
    const recipe = props.recipe;

    // This function will run if the user changes the image for the recipe
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    // This function is used when the user updates the recipe 
  const handleSubmit = (recipe) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        postNewRecipe(reader.result, recipe);
      };
      reader.onerror = () => {
        addToast( 'Något gick fel vid inläsning av ny bild' , { appearance: 'error' });
      };
  };

  // This function is used when a user submits a update to a recipe and the image has also been updated
  const postNewRecipe = async (base64EncodedImage, recipe) => {
    const response = await postUploadImage(base64EncodedImage);
    await postRecipe(recipe, response)
      .then(() => {
        addToast('Receptet har uppdaterats!', { appearance: 'success' });
      })
      .catch((error) => {
        addToast( 'Det gick inte att uppdatera receptet, följande fel uppstod: ' + error.message, { appearance: 'error' });
    });
  };

//   onDismiss = () => {
//     this.setState({ visible: false });
//   };

//   uploadImage = async (base64EncodedImage, recipe) => {
//     const name = recipe.name;
//     const source = recipe.source;
//     const description = recipe.description;
//     const ingredients = recipe.ingredients;
//     const steps = recipe.steps;
//     const tags = recipe.tags;

//     try {
//       await axios("https://xentras-recipe-backend.herokuapp.com/recipe/upload", {
//         method: "POST",
//         data: JSON.stringify({ data: base64EncodedImage }),
//         headers: { "Content-Type": "application/json" },
//       }).then((response) => {
//         console.log(response.data.url);
//         const imageURL = response.data.url;
//         const recipeSend = {
//           name,
//           source,
//           description,
//           ingredients,
//           steps,
//           tags,
//           imageURL,
//         };

//         axios
//           .post("https://xentras-recipe-backend.herokuapp.com/recipe/", recipeSend)
//           .then((response2) => {
//             console.log("Recipe Created");
//             if (response2.status === 201) {
//               this.setState({ visible: true, success: true });
//             }
//           })
//           .catch((err) => {
//             this.setState({ visible: true, success: false });
//             console.error(err);
//           });
//       });
//       //setSuccessMsg("Image uploaded successfully");
//     } catch (err) {
//       console.error(err);
//       //setErrMsg("Something went wrong!");
//     }
//   };

//   componentWillUnmount() {
//     this.props.dispatch(actions.reset('recipe'));
//   }

//   handleSubmit = (recipe) => {
//     console.log(recipe);
//     const { file } = this.state;
    
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       this.uploadImage(reader.result, recipe);
//     };
//     reader.onerror = () => {
//       console.error("Something went wrong!");
//       //setErrMsg("Something went wrong!");
//     };
//   };

    return (
      <Form
        className="ui container"
        model="recipe"
      >
        <div className="ui form">
          <BrowserView>
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
                      onChange={(e) => handleImageChange(e)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="column"></div>
              </div>
              <div className="on column row">
                <div className="column" style={{ textAlign: "center" }}>
                  <img alt="" src={previewImage} />
                </div>
              </div>
            </div>
          </BrowserView>
          <MobileView>
            <Name />
            <Source />
            <Description />
            <Ingredients />
            <Steps />
            <Tags />
            <div>
              <input type="file" onChange={(e) => handleImageChange(e)} />
              <br />
              <img alt="" src={previewImage} />
            </div>
          </MobileView>
        </div>
        <button className="ui labeled icon primary button" type="submit" onClick={() => handleSubmit(recipe)}>
          <i className="save icon"></i>
          Spara recept!
        </button>
        <div style={{ height: 150 }}></div>
      </Form>
    );
}

export default connect((s) => s)(Add);
