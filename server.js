const express = require("express");
const app = express();
// console.dir(app); Display the application methods
const port = 8080;
// Above sets up out express server
const path = require("path");
app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// connects the root directory to views
const axios = require("axios");
const mongoose = require("mongoose");
// EJS doesn't need to be required

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
  res.send("This is the home page");
});
app.get("/pokedex", (req, res) => {
  res.send("This is the pokemon list");
});
app.get("/battlegrounds", (req, res) => {
  res.send("This is arena");
});
app.get("/profile", (req, res) => {
  res.send("This your profile");
});

app.listen(8080, () => {
  // listens to request/posts from browsers on 8080
  console.log("Express listening on port 8080");
  // verify connection
});
