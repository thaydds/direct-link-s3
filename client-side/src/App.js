import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://localhost:3333";

function App() {
  function getSignedRequest(file) {
    axios
      .get(`${BASE_URL}/sign-s3?file-name=${file.name}&file-type=${file.type}`)
      .then(({ data }) => {
        console.log("response", data);
        uploadFile(file, data.signedRequest, data.url);
      });
  }

  const uploadFile = async (file, signedRequest, url) => {
    const teste = {
      headers: {
        "Content-Type": file.type
      }
    };

    console.log("signedRequest", signedRequest);
    await axios.put(signedRequest, file, teste).then(r => setImg(url));
  };

  const [file, setFile] = useState({ name: "" });
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [img, setImg] = useState("");

  // useEffect(() => {
  //   axios.get(BASE_URL).then(res => {});
  // }, []);
  console.log(file);

  return (
    <div className="App">
      <input
        onChange={e => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
        type="file"
        id="file-input"
      />
      <p id="status">Please select a file</p>

      {img && <img width="200" height="200" id="preview" src={img} />}
      <form
        onSubmit={e => {
          e.preventDefault();
          getSignedRequest(file);
        }}
      >
        <input
          onChange={e => setUsername(e.target.value)}
          type="text"
          name="username"
          value={username}
          placeholder="Username"
        />
        <input
          onChange={e => setFullname(e.target.value)}
          type="text"
          value={fullname}
          name="full-name"
          placeholder="Full name"
        />
        <input type="submit" value="Update profile" />
      </form>
    </div>
  );
}

export default App;
