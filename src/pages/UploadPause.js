import React, { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { Button, Form, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function Upload() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Something went wrong!");
      setErrMsg("Something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await axios("http://localhost:3005/recipe/upload", {
        method: "POST",
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };
  return (
    <div style={{marginLeft: "5%", marginRight: "5%" }}>
      <h1 className="title">Upload an Image</h1>
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
      <Form onSubmit={handleSubmitFile} className="ui-form">
        <Form.Group>
            <label>Recept namn:</label>
            <Input id="recipieName" type="text" name="recipieName" />
            <label>Beskrivning:</label>
            <Input id="description" type="text" name="description" />
        </Form.Group>
        <Form.Field>
          <Input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
          <Button className="btn" type="submit">
            Submit
          </Button>
          </Form.Field>
      </Form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}