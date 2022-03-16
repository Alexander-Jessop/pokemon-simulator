const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/battlegrounds", (req, res) => {
  res.send("Welcome to the Thunder-Dome");
});

app.get("/pokemonlist", (req, res) => {
  res.send("What pokemon is this?");
});

app.get("/profilepage", (req, res) => {
  res.send("Look at my stuff!");
});

app.get("*", (req, res) => {
  res.send("nothing here");
});

app.listen(8080, () => {});
