import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const BASE_URL = "http://localhost:3333";
function getSignedRequest(file) {
  axios
    .get(`${BASE_URL}/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    .then(r => {
      console.log("response", r);
      // uploadFile(file, r.signedRequest, r.url);
    });
}

function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById("preview").src = url;
        document.getElementById("avatar-url").value = url;
      } else {
        alert("Could not upload file.");
      }
    }
  };
  xhr.send(file);
}

function App() {
  const [file, setFile] = useState({ name: "" });
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

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
      <img width="200" height="200" id="preview" src="tracer_lgbt.png" />
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
