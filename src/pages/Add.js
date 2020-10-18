import React from "react";
import axios from "axios";
import { Form, actions } from "react-redux-form";
import Name from "../form/Name";
import Description from "../form/Description";
import Ingredients from "../form/Ingredients";
import Steps from "../form/Steps";
import Tags from "../form/Tags";
import Source from "../form/Source";
import { BrowserView, MobileView } from "react-device-detect";
import { connect } from "react-redux";

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      previewFile: null,
      visible: null,
      success: null,
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

  onDismiss = () => {
    this.setState({ visible: false });
  };

  uploadImage = async (base64EncodedImage, recipe) => {
    const name = recipe.name;
    const source = recipe.source;
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
          source,
          description,
          ingredients,
          steps,
          tags,
          imageURL,
        };

        axios
          .post("http://192.168.10.218:3005/recipe/", recipeSend)
          .then((response2) => {
            console.log("Recipe Created");
            if (response2.status === 201) {
              this.setState({ visible: true, success: true });
            }
          })
          .catch((err) => {
            this.setState({ visible: true, success: false });
            console.error(err);
          });
      });
      //setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      //setErrMsg("Something went wrong!");
    }
  };

  componentWillUnmount() {
    this.props.dispatch(actions.reset('recipe'));
  }

  handleSubmit = (recipe) => {
    console.log(recipe);
    const { file } = this.state;
    
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.uploadImage(reader.result, recipe);
    };
    reader.onerror = () => {
      console.error("Something went wrong!");
      //setErrMsg("Something went wrong!");
    };
  };

  render() {
    let message;
    if (this.state.success === true) {
      message = (
        <div class="ui positive message">
          <i class="close icon" onClick={this.onDismiss}></i>
          <div class="header">You are eligible for a reward</div>
          <p>
            Go to your <b>special offers</b> page to see now.
          </p>
        </div>
      );
    } else {
      message = (
        <div class="ui negative message">
          <i class="close icon" onClick={this.onDismiss}></i>
          <div class="header">We're sorry we can't apply that discount</div>
          <p>That offer has expired</p>
        </div>
      );
    }

    return (
      <Form
        className="ui container"
        model="recipe"
        onSubmit={(recipe) => this.handleSubmit(recipe)}
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
                      onChange={this.handleChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="column"></div>
              </div>
              <div className="on column row">
                <div className="column" style={{ textAlign: "center" }}>
                  <img alt="" src={this.state.previewFile} />
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
              <input type="file" onChange={this.handleChange} />
              <br />
              <img alt="" src={this.state.previewFile} />
            </div>
          </MobileView>
        </div>
        <button className="ui labeled icon primary button" type="submit">
          <i className="save icon"></i>
          Spara recept!
        </button>
        {this.state.visible && message}
        <div style={{ height: 150 }}></div>
      </Form>
    );
  }
}

export default connect((s) => s)(Add);
