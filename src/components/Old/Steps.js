// import React, { useState, useEffect, useCallback } from "react";
// import { Field, actions } from "react-redux-form";
// import { connect } from "react-redux";

// function Steps(props) {
//     const [buttonsEnabled, setButtonsEnabled] = useState(false);
//     const { dispatch } = props;
//     const recipe = props.recipe;

//     const onRemoveClick = (i) => {
//         removeStep(i);
//         updateButtonState();
//     };

//     const onAddClick = () => {
//         addStep();
//         updateButtonState();
//     };

//     const removeStep = (i) => {
//         dispatch(actions.remove("recipe.steps", i))
//     }

//     const addStep = (i) => {
//         dispatch(actions.push("recipe.steps", ""))
//     }

//     const updateButtonState = useCallback(() => {
//         if (recipe.steps.length !== 1) {
//           setButtonsEnabled(true)
//         } else if (recipe.steps.length === 1) {
//           setButtonsEnabled(false)
//         }
//       }, [recipe.steps.length]);

//     useEffect(() => {
//         updateButtonState()
//     }, [updateButtonState])

//     return (
//       <div>
//         <label htmlFor="recipe.steps">Steg: </label>
//         {recipe.steps.map((step, i) => (
//           <Field
//             className="ui fluid action input"
//             style={{ paddingTop: 5, paddingBottom: 5 }}
//             model={`recipe.steps[${i}]`}
//             key={i}
//           >
//             <input type="text" defaultValue="" />
//             <button
//               disabled={!buttonsEnabled}
//               className="ui red icon button"
//               onClick={() => onRemoveClick(i)}
//             >
//               <i className="trash icon"></i>
//             </button>
//           </Field>
//         ))}
//         <div>
//         <button
//             className="positive ui labeled icon button"
//             style={{ marginTop: 10 }}
//             onClick={() => onAddClick()}
//           >
//             <i className="plus icon" />
//             Lägg till steg
//           </button>
//         </div>
//       </div>
//     );
// }

// export default connect((s) => s)(Steps);
