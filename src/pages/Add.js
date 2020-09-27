import React from "react";
import axios from "axios";

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [{ name: "" }],
      steps: "",
      tags: "",
      description: "",
      name: "",
      file: null,
      previewFile: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange(event) {
    this.setState({
      file: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0]),
    });
  }

  //   handleChange = (e) => {
  //     if (["name", "age"].includes(e.target.className) ) {
  //       let cats = [...this.state.cats]
  //       cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
  //       this.setState({ cats }, () => console.log(this.state.cats))
  //     } else {
  //       this.setState({ [e.target.name]: e.target.value.toUpperCase() })
  //     }
  //   }

  //   handleSubmitFile = (e) => {
  //     e.preventDefault();

  //     const {file} = this.state;

  //     if (!file) return;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       this.uploadImage(reader.result);
  //     };
  //     reader.onerror = () => {
  //       console.error("Something went wrong!");
  //       //setErrMsg("Something went wrong!");
  //     };
  //   };

  uploadImage = async (base64EncodedImage) => {
    const { ingredients, steps, tags, description, name } = this.state;

    try {
      await axios("http://localhost:3005/recipe/upload", {
        method: "POST",
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(response.data.url);
        const imageURL = response.data.url;
        const recipe = {
          ingredients,
          steps,
          tags,
          description,
          name,
          imageURL,
        };

        axios
          .post("http://192.168.10.218:3005/recipe/", recipe)
          .then(() => console.log("Recipe Created"))
          .catch((err) => {
            console.error(err);
          });
      });
      //setFileInputState("");
      //setPreviewSource("");
      //setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      //setErrMsg("Something went wrong!");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { file } = this.state;

    // console.log(file);

    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Something went wrong!");
      //setErrMsg("Something went wrong!");
    };

    // const recipe = {
    //   ingredients,
    //   steps,
    //   tags,
    //   description,
    //   name,
    // };

    // axios
    //   .post("http://192.168.10.218:3005/recipe/", recipe)
    //   .then(() => console.log("Recipe Created"))
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: "" }])
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };

  handleIngredientNameChange = idx => evt => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, name: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  };

  render() {
    return (
      <div className="ui container">
        <br />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {/* <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="ingredients"
                placeholder="Ingredients"
                onChange={this.handleInputChange}
              />
            </div> */}
            {this.state.ingredients.map((ingredient, idx) => (
              <div className="form-group">
                <input
                  type="text"
                  key={"Ingredient" + idx}
                  placeholder={`Ingredient #${idx + 1} name`}
                  value={ingredient.name}
                  onChange={this.handleIngredientNameChange(idx)}
                />
                <button
                  type="button"
                  onClick={this.handleRemoveIngredient(idx)}
                  className="small"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={this.handleAddIngredient}
              className="small"
            >
              Add Shareholder
            </button>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="steps"
                placeholder="Steps"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="tags"
                placeholder="Tags"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <input type="file" onChange={this.handleChange} />
              <br />
              <img alt="" src={this.state.previewFile} />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Add;
