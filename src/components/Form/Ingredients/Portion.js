import React from "react";
import CustomField from "../../Common/CustomField/CustomField.js";
import CustomErrorMessage from "../../Common/CustomErrorMessage/CustomErrorMessage.js";
import CustomPopup from "../../Common/CustomPopup/CustomPopup.js";
import Input from "../../Common/Input/Input.js";

function Portion(props) {
  const index = props.index;

  return (
    <div className="required field">
      <label htmlFor={`ingredients.${index}.size`}>
        Antal portioner
        <CustomPopup
          content="Ange hur många portioner som ingredienserna ska räcka till."
          position="top center"
        />
      </label>
      <Input
        name={`ingredients.${index}.size`}
        type="text"
        placeholder="Portioner"
      />
      <CustomErrorMessage name={`ingredients.${index}.size`} />
    </div>
  );
}

export default Portion;
