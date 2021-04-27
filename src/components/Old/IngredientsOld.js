// import React from "react";
// import { Fieldset, actions, Control } from "react-redux-form";
// import { connect } from "react-redux";
// import { Popup, Icon } from "semantic-ui-react";

// class Ingredients extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       enableButtonRemoveIngredient: [false],
//       enableButtonRemovePerson: false,
//     };
//   }

//   async onAddPersonClick() {
//     await this.addPersonField();
//     this.updateRemoveButtonStatePerson();
//   }

//   async onRemovePersonClick(i) {
//     await this.removePerson(i);
//     this.updateRemoveButtonStatePerson();
//   }

//   async onAddIngredientClick(i) {
//     await this.addIngredientField(i);
//     this.updateRemoveButtonStateIngredients(i);
//   }

//   async onRemoveIngredientClick(i, j) {
//     await this.removeIngredient(i, j);
//     this.updateRemoveButtonStateIngredients(i);
//   }

//   // This will remove a ingredient from the redux store
//   removeIngredient(i, j) {  
//     const { dispatch } = this.props;
//     dispatch(actions.remove(`recipe.ingredients[${i}].ingredient`, j));
//     return;
//   }

//   removePerson(i) {
//     // This will remove a person from the redux store
//     const { dispatch } = this.props;
//     dispatch(actions.remove("recipe.ingredients", i));

//     // If person is removed, the state for the associated "remove ingredient" button is removed
//     const removeIngredientButtonState = this.state.enableButtonRemoveIngredient
//       .slice(0, i)
//       .concat(
//         this.state.enableButtonRemoveIngredient.slice(
//           i + 1,
//           this.state.enableButtonRemoveIngredient.length
//         )
//       );
//     this.setState({
//       enableButtonRemoveIngredient: removeIngredientButtonState,
//     });
//     return;
//   }

//   async addPersonField() {
//     // This is needed to initialize a new person
//     const initializePerson = {
//       size: "",
//       ingredient: [{ name: "", amount: "", unit: "", subcategory: "" }],
//     };
//     // This will add a new person to the redux store
//     const { dispatch } = this.props;
//     dispatch(actions.push("recipe.ingredients", initializePerson));

//     // When adding a new person, a new variable for keeping track of "remove ingredient" button is added
//     this.setState({
//       enableButtonRemoveIngredient: [
//         ...this.state.enableButtonRemoveIngredient,
//         false,
//       ],
//     });
//     return;
//   }

//   // This will add a ingredient to the redux store
//   async addIngredientField(i) {
//     const { dispatch } = this.props;
//     dispatch(actions.push(`recipe.ingredients[${i}].ingredient`, ""));
//     return;
//   }

//   // If there are more than 1 ingredient, the button to remove a ingredient should be available
//   updateRemoveButtonStateIngredients(i) {
//     console.log(this.state.enableButtonRemoveIngredient)
//     const { recipe } = this.props;
//     // this if/else will update the state everytime a ingredient is added/removed
//     if (recipe.ingredients[i].ingredient.length !== 1) {
//       const updateRemoveIngredientButtonList = this.state.enableButtonRemoveIngredient.slice();
//       updateRemoveIngredientButtonList[i] = true;
//       this.setState({
//         enableButtonRemoveIngredient: updateRemoveIngredientButtonList,
//       });
//     } else if (recipe.ingredients[i].ingredient.length === 1) {
//       const updateRemoveIngredientButtonList = this.state.enableButtonRemoveIngredient.slice();
//       updateRemoveIngredientButtonList[i] = false;
//       this.setState({
//         enableButtonRemoveIngredient: updateRemoveIngredientButtonList,
//       });
//     }
//   }

//   // If there are more than 1 person, the button to remove a person should be available
//   updateRemoveButtonStatePerson() {
//     console.log(this.state.enableButtonRemovePerson)
//     const { recipe } = this.props;
//     // this if/else will update the state everytime a person is added/removed
//     if (recipe.ingredients.length !== 1) {
//       this.setState({
//         enableButtonRemovePerson: true,
//       });
//     } else if (recipe.ingredients.length === 1) {
//       this.setState({
//         enableButtonRemovePerson: false,
//       });
//     }
//   }

//   // Very strange way to update the ingredients button state, this needs to be looked over and fixed!
//   // Kolla om man kan göra en simple version av updateRemoveButtonStateIngredients istället för att kalla på den
//   updateStateOnLoad() {
//     const { recipe } = this.props;
//     const updateState = this.state.enableButtonRemoveIngredient;
//     for (var i = 0; i < recipe.ingredients.length; i++) {
//       if(recipe.ingredients[i].ingredient.length > 1) {
//         updateState[i] = true;
//         this.setState({
//           enableButtonRemoveIngredient: updateState
//         });
//       } else if(recipe.ingredients[i].ingredient.length === 1) {
//         updateState[i] = false;
//         this.setState({
//           enableButtonRemoveIngredient: updateState
//         });
//       }
//     }
//   }

//   // This will update the button state when updating a recipe
//   componentDidMount() {    
//     this.updateRemoveButtonStatePerson();
//     this.updateStateOnLoad();
//   }

//   render() {
//     const { recipe } = this.props;
//     return (
//       <div className="ui segment">
//         <label htmlFor="recipe.ingredients">Ingredienser: </label>
//         {recipe.ingredients.map((ingredient, i) => (
//           <Fieldset
//             className="ui grid"
//             style={{ marginBottom: 10, marginTop: 5 }}
//             model={`recipe.ingredients[${i}]`}
//             key={i}
//           >
//             <div className="two wide column">
//               <label htmlFor="size">Antal personer/portioner:</label>
//               <Popup
//                 trigger={<Icon name="info circle" color="blue" />}
//                 content="Ange hur många personer/portioner som ingredienserna ska räcka till."
//                 position="top center"
//               />
//               <Control.input
//                 model=".size"
//                 placeholder="Portioner"
//                 defaultValue=""
//                 id="size"
//               />
//             </div>
//             <div className="fourteen wide column"></div>
//             {recipe.ingredients[i].ingredient.map((test, j) => (
//               <Fieldset
//                 className="ui grid"
//                 style={{ marginTop: 5 }}
//                 model={`recipe.ingredients[${i}].ingredient[${j}]`}
//                 key={j}
//               >
//                 <div className="two wide column">
//                   <Control.input
//                     model=".amount"
//                     placeholder="Mängd"
//                     defaultValue=""
//                   />
//                 </div>
//                 <div className="two wide column">
//                   <Control.select model=".unit" defaultValue="">
//                     <option value="empty"></option>
//                     <option value="kg">kg</option>
//                     <option value="hg">hg</option>
//                     <option value="g">g</option>
//                     <option value="l">l</option>
//                     <option value="dl">dl</option>
//                     <option value="cl">cl</option>
//                     <option value="ml">ml</option>
//                     <option value="msk">msk</option>
//                     <option value="tsk">tsk</option>
//                     <option value="krm">krm</option>
//                   </Control.select>
//                 </div>
//                 <div className="four wide column">
//                   <Control.input
//                     model=".name"
//                     placeholder="Ingrediens"
//                     defaultValue=""
//                   />
//                 </div>
//                 <div className="four wide column">
//                   <Control.input
//                     model=".subcategory"
//                     placeholder="Kategori"
//                     defaultValue=""
//                   />
//                 </div>
//                 <div className="one wide column">
//                   <button
//                     disabled={!this.state.enableButtonRemoveIngredient[i]}
//                     className="ui red icon button"
//                     onClick={() => this.onRemoveIngredientClick(i, j)}
//                   >
//                     <i className="trash icon"></i>
//                   </button>
//                 </div>
//               </Fieldset>
//             ))}
//             <div className="eight wide column">
//               <button
//                 className="positive ui labeled icon button"
//                 style={{ marginTop: 10 }}
//                 onClick={() => this.onAddIngredientClick(i)}
//               >
//                 <i className="plus icon" />
//                 Lägg till ingrediens
//               </button>
//               <button
//                 disabled={!this.state.enableButtonRemovePerson}
//                 className="ui red icon button"
//                 onClick={() => this.onRemovePersonClick(i)}
//               >
//                 <i className="trash icon" />
//                 Ta bort person/portion
//               </button>
//             </div>
//           </Fieldset>
//         ))}
//         <div>
//           <button
//             className="primary ui labeled icon button"
//             style={{ marginTop: 10 }}
//             onClick={() => this.onAddPersonClick()}
//           >
//             <i className="plus icon" />
//             Lägg till person/portion
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect((s) => s)(Ingredients);
