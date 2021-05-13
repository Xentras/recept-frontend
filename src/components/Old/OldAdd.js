// import React, { useState, useEffect } from "react";
// import { useToasts } from "react-toast-notifications";
// import { Form, actions } from "react-redux-form";
// import Name from "../components/Form/Name.js";
// import Description from "../components/Form/Description";
// import Ingredients from "../components/Form/Ingredients";
// import Steps from "../components/Form/Steps";
// import Tags from "../components/Form/Tags";
// import Source from "../components/Form/Source";
// import { BrowserView, MobileView } from "react-device-detect";
// import { connect } from "react-redux";
// import { postUploadImage, postRecipe } from "../api/api.js";

// function Add(props) {
//   const [image, setImage] = useState();
//   const [previewImage, setPreviewImage] = useState();
//   const { addToast } = useToasts();
//   const { dispatch } = props;
//   const recipe = props.recipe;

//   // This function will run if the user changes the image for the recipe
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//     setPreviewImage(URL.createObjectURL(e.target.files[0]));
//   };

//   // This function is used when the user submits the recipe
//   const handleSubmit = (recipe) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onloadend = () => {
//       postNewRecipe(reader.result, recipe);
//     };
//     reader.onerror = () => {
//       addToast("Något gick fel vid inläsning av ny bild", {
//         appearance: "error",
//       });
//     };
//   };

//   // This function is used when a user submits a recipe
//   const postNewRecipe = async (base64EncodedImage, recipe) => {
//     const response = await postUploadImage(base64EncodedImage);
//     await postRecipe(recipe, response)
//       .then(() => {
//         addToast("Receptet har uppdaterats!", { appearance: "success" });
//       })
//       .catch((error) => {
//         addToast(
//           "Det gick inte att uppdatera receptet, följande fel uppstod: " +
//             error.message,
//           { appearance: "error" }
//         );
//       });
//   };

//   useEffect(() => {
//     // returned function will be called on component unmount
//     return () => {
//       dispatch(actions.reset("recipe"));
//     };
//   }, []);

//   return (
//     <Form className="ui container" model="recipe">
//       <div className="ui form">
//         <BrowserView>
//           <div className="ui grid">
//             <div className="two column row">
//               <div className="column">
//                 <Name />
//               </div>
//               <div className="column">
//                 <Source />
//               </div>
//             </div>
//             <div className="one column row">
//               <div className="column">
//                 <Description />
//               </div>
//             </div>
//             <div className="one column row">
//               <div className="column">
//                 <Ingredients />
//               </div>
//             </div>
//             <div className="three column row">
//               <div className="column">
//                 <Steps />
//               </div>
//               <div className="column">
//                 <Tags />
//               </div>
//               <div className="column" />
//             </div>
//             <div className="three column row">
//               <div className="column"></div>
//               <div className="column">
//                 <div className="ui input">
//                   <label
//                     htmlFor="file"
//                     className="positive ui labeled icon button"
//                   >
//                     <i className="image icon"></i>
//                     Lägg till bild
//                   </label>
//                   <input
//                     type="file"
//                     id="file"
//                     onChange={(e) => handleImageChange(e)}
//                     style={{ display: "none" }}
//                   />
//                 </div>
//               </div>
//               <div className="column"></div>
//             </div>
//             <div className="on column row">
//               <div className="column" style={{ textAlign: "center" }}>
//                 <img alt="" src={previewImage} />
//               </div>
//             </div>
//           </div>
//         </BrowserView>
//         <MobileView>
//           <Name />
//           <Source />
//           <Description />
//           <Ingredients />
//           <Steps />
//           <Tags />
//           <div>
//             <input type="file" onChange={(e) => handleImageChange(e)} />
//             <br />
//             <img alt="" src={previewImage} />
//           </div>
//         </MobileView>
//       </div>
//       <button
//         className="ui labeled icon primary button"
//         type="submit"
//         onClick={() => handleSubmit(recipe)}
//       >
//         <i className="save icon"></i>
//         Spara recept!
//       </button>
//       <div style={{ height: 150 }}></div>
//     </Form>
//   );
// }

// export default connect((s) => s)(Add);
