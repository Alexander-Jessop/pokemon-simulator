const express = require("express");
const app = express();
const path = require("path");

// REQUIRES
const axios = require("axios");
const ejsMate = require("ejs-mate");
// const mongoose = require("mongoose");

// MODELS / REQUIRES
// const Userprofile = require("./signup/users.js");
// importing the mongooseSchema from users.js

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware

// Mongoose
//   .connect("mongodb://localhost:27017/pokemon")
//   .then(() => {
//     console.log("Mongo conection open");
//   })
//   .catch((err) => {
//     console.error("Mongo error");
//     console.log(err);
//   });

// app.get("/", (req, res) => {
//   res.render("index");
// });

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
    // console.log(data);

    // console.log(pokeData);
    let pokename = data.name;
    console.log(pokename);
    // console.log(pokename);
    const pokeID = data.order;
    // console.log(pokeID);
    const spritesCont = data.sprites.other["official-artwork"]["front_default"];

    pokeData.push({
      name: pokename,
      id: data.id,
      sprites: spritesCont,
      // moves: {[data.moves[0].move.name]: data.moves[0].move.url},
    });
    console.log(pokeData);
  }

  // res.send(pokeData);
  res.render("pokedex", { pokeData });
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
