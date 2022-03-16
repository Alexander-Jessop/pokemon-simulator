const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/battlegrounds", (req, res) => {
  res.send("This is the home page");
});

app.get("/pokemonlist", (req, res) => {
  res.send("This is the home page");
});

app.get("/profilepage", (req, res) => {
  res.send("This is the home page");
});

app.listen(8080, () => {});
