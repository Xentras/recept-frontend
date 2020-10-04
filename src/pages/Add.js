import React from "react";
import axios from "axios";
import { Form } from "react-redux-form";
import Name from "../form/Name";
import Description from "../form/Description";
import Ingredients from "../form/Ingredients";
import Steps from "../form/Steps";
import Tags from "../form/Tags";

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      previewFile: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  handleChange(event) {
    this.setState({
      file: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0]),
    });
  }

  uploadImage = async (base64EncodedImage, recipe) => {
    const name = recipe.name;
    const description = recipe.description;
    const ingredients = recipe.ingredients;
    const steps = recipe.steps;
    const tags = recipe.tags;

    try {
      await axios("http://192.168.10.218:3005/recipe/upload", {
        method: "POST",
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(response.data.url);
        const imageURL = response.data.url;
        const recipeSend = {
          name,
          description,
          ingredients,
          steps,
          tags,
          imageURL,
        };

        axios
          .post("http://192.168.10.218:3005/recipe/", recipeSend)
          .then(() => console.log("Recipe Created"))
          .catch((err) => {
            console.error(err);
          });
      });
      //setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      //setErrMsg("Something went wrong!");
    }
  };

  handleSubmit = (recipe) => {
    console.log(recipe)
    // const { file } = this.state;

    // if (!file) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   this.uploadImage(reader.result, recipe);
    // };
    // reader.onerror = () => {
    //   console.error("Something went wrong!");
    //   //setErrMsg("Something went wrong!");
    // };
  };

  render() {
    return (
      <Form model="recipe" onSubmit={(recipe) => this.handleSubmit(recipe)}>
        <Name />
        <Description />
        <Ingredients />
        <Steps />
        <Tags />
        <div>
          <input type="file" onChange={this.handleChange} />
          <br />
          <img alt="" src={this.state.previewFile} />
        </div>

        <button type="submit">Finish registration!</button>
      </Form>
    );
  }
}

export default Add;
