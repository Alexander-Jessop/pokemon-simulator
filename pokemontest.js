const express = require("express");
const app = express();
// console.dir(app); Display the application methods
const port = 3000;
// Above sets up out express server
const path = require("path");
app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// connects the root directory to views
const axios = require("axios");
const mongoose = require("mongoose");
// EJS doesn't need to be required

const Userprofile = require("./signup/users.js");
// importing the mongooseSchema from users.js

mongoose
  .connect("mongodb://localhost:27017/pokemon")
  .then(() => {
    console.log("Mongo conection open");
  })
  .catch((err) => {
    console.error("Mongo error");
    console.log(err);
  });

app.get("/", (req, res) => {
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
});

app.listen(3000, () => {
  // listens to request/posts from browsers on 8080
  console.log("Express listening on port 8080");
  // verify connection
});
