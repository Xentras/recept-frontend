function trimData(props) {
    const nameTrim = () => {
        return props.name.replace(/\s+/g, " ").trim();
    }

    const sourceTrim = () => {
        return props.source.replace(/\s+/g, " ").trim();
    }

    const descriptionTrim = () => {
        return props.description.replace(/\s+/g, " ").trim();
    }

    const ingredientsTrim = () => {
        let ingredients = [];
        let ingredient = {}
        props.ingredients.forEach((object) => {
          ingredients.push(
            (ingredient = {
              size: object.size,
              ingredient: ingredientTrim(object.ingredient),
            })
          );
        });

        return ingredients;
    }

    const ingredientTrim = (ingredient) => {
        let tmpArray = []
        let tmpObject = {};
        ingredient.forEach((object) => {
          tmpArray.push(
            (tmpObject = {
              amount: object.amount,
              unit: object.unit,
              name: object.name.replace(/\s+/g, " ").trim(),
              subcategory: object.subcategory.replace(/\s+/g, " ").trim(),
            })
          );
        });

        return tmpArray;
    }

    const stepsTrim = () => {
        let tmpArray = []
        props.steps.forEach(value => {
            tmpArray.push(value.replace(/\s+/g, " ").trim())
        })

        return tmpArray;
    }

    const tagsTrim = () => {
        let tmpArray = []
        props.tags.forEach(value => {
            tmpArray.push(value.replace(/\s+/g, " ").trim())
        })

        return tmpArray;
    }

    let formatedRecipe = {
        name: nameTrim(),
        source: sourceTrim(),
        description: descriptionTrim(),
        ingredients: ingredientsTrim(),
        steps: stepsTrim(),
        tags: tagsTrim(),
        imageURL: props.imageURL,
        googleId: props.googleId,
        createdAt: props.createdAt,
        _id: props._id,
        __v: props.__v
    }


    return formatedRecipe;
}

export default trimData;