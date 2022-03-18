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
  res.send("This is the home page");
});

app.get("/pokedex", async (req, res) => {
  let pokeData = [];

  let estApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5");
  const { data } = estApi;
  const pokemon = data.results;

  for (let catagory in pokemon) {
    // console.log(catagory);
    // console.log(pokemon[catagory].url);
    const pokeStatPage = pokemon[catagory].url;

    let responseTwo = await axios.get(pokeStatPage);
    const { data } = responseTwo;
    const pokename = data.name;
    const pokeID = data.order;
    const spritesCont = data.sprites.other["official-artwork"]["front_default"];
    console.log(spritesCont);

    // for (let i = 0, i < spritesCont.legnth, i++){
    //   let responseThree = await axios.get(spritesOrganize[]);

    // let responseThree = await axios.get(spritesOrganize);
    // const { data } = responseThree;
    // const pokeSprit = data;

    pokeData.push(pokename, pokeID);
  }

  res.send(pokeData);
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
