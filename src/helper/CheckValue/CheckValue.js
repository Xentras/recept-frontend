function CheckValue(value) {
  let ingredientErrorCounter = 0;
  let stepErrorCounter = 0;
  let tagErrorCounter = 0;
  let errorList = [];
  if (value.name === "") {
    errorList.push("Namn");
  }

  value.ingredients.forEach((object) => {
    object.ingredient.forEach((object2) => {
      if (object2.name === "") {
        ingredientErrorCounter++;
      }
    });
  });

  value.steps.forEach((object) => {
    if (object === "") {
      stepErrorCounter++;
    }
  });

  value.tags.forEach((object) => {
    if (object === "") {
      tagErrorCounter++;
    }
  });

  if (ingredientErrorCounter !== 0) {
    errorList.push("Ingrediens");
  }

  if (stepErrorCounter !== 0) {
    errorList.push("Steg");
  }

  if (tagErrorCounter !== 0) {
    errorList.push("Kategori");
  }

  return errorList;
}

export default CheckValue;
