const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Userprofile = require("./signup/users.js");

// REQUIRES^

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/pokemon")
  .then(() => {
    console.log("Mongo conection open");
  })
  .catch((err) => {
    console.error("Mongo error");
    console.log(err);
  });

app.get("/pokedex", async (req, res) => {
  let pokeData = [];
  // Must tie limit amount to "secondCall"
  // limit allows you to access how many pokemon load. Smaller is faster larger is longer
  let estApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=25");
  const { data } = estApi;
  const pokemon = data.results;

  for (let i = 0; i < pokemon.length; i++) {
    let pokeApi = await axios.get(pokemon[i].url);
    const { data } = pokeApi;
    let pokename = data.name;
    let spritesCont = data.sprites.other["official-artwork"]["front_default"];

    pokeData.push({
      order: data.order,
      name: pokename,
      id: data.id,
      sprites: spritesCont,
    });
  }
  res.render("pokedex", { pokeData });
});

app.get("/pokedex/:id", async (req, res) => {
  const pokeID = req.params.id;
  const pokeStatPage = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
  const pokeData = [];
  const movesData = [];
  let opponentsData = [];
  let opponentsSpritesArray = [];

  let response = await axios.get(pokeStatPage);
  const { data } = response;
  const pokemon = data;
  const spritesCont =
    pokemon.sprites.other["official-artwork"]["front_default"];
  const moves = pokemon.moves;

  async function secondCall() {
    // Must tie limit amount to "/pokedex"
    let estApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=25");
    let { data } = estApi;
    let pokemon2 = data.results;

    for (let i = 0; i < pokemon2.length; i++) {
      let pokeApi = await axios.get(pokemon2[i].url);
      const { data } = pokeApi;

      let pokename = data.name;

      let opponentsSprites =
        data.sprites.other["official-artwork"]["front_default"];
      opponentsData.push({
        name: pokename,
        sprites: opponentsSprites,
      });
    }
  }
  await secondCall();

  for (let i = 0; i < moves.length; i++) {
    if (i < 10) {
      let allAtkData = moves[i].move.name;
      movesData.push(allAtkData);
      // console.log(movesData);
    }
  }
  pokeData.push({
    order: data.order,
    name: pokemon.name,
    id: pokemon.id,
    sprites: spritesCont,
    moves: movesData,
    opponent: { opponentsData },
  });

  // console.log(pokeData[0].opponent.opponentsData[1].name);
  res.render("pokemonstats", { pokeData });
});

app.post("/battlegrounds", async (req, res) => {
  let { pokemon, attack, opponents, test } = req.body;
  opponents = JSON.parse(opponents);

  // console.log("pokemon:", pokemon);
  // console.log(opponents);
  // console.log(opponents.name);

  res.render("battlegrounds", { pokemon, attack, opponents, test });
});

app.get("/profile", async (req, res) => {
  const userProfile = await Userprofile.find({});
  res.render("profile", { userProfile });
});

app.listen(8080, () => {
  // listens to request/posts from browsers on 8080
  console.log("Express listening on port 8080");
  // console.log verifying connection
});

//************************** OLD CODE **********************************/

// Garbage attempt at pulling API JSON --- The looping pattern was incorrect. It would pull data once and then loop to pull same data again plus next step; creating snowball effect. Solution is to isolate API JSON and then for of loop instead of for in.

// app.get("/pokedex", async (req, res) => {
//   let pokeData = [];
//   let movesData = [];
//   let topAttk10 = [];

//   let estApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2");
//   const { data } = estApi;
//   const pokemon = data.results;

//   for (let catagory in pokemon) {
//     const pokeStatPage = pokemon[catagory].url;

//     let responseTwo = await axios.get(pokeStatPage);
//     const { data } = responseTwo;

//     const pokename = data.name;
//     const pokeID = data.order;
//     const spritesCont = data.sprites.other["official-artwork"]["front_default"];
//     const atk = data.moves;

//     for (let num in atk) {
//       let allAtkData = atk[num].move.name;
//       console.log(allAtkData);
//       movesData.push(allAtkData);
//     }

//     for (let i = 0; i < 9; i++) {
//       topAttk10.push(movesData[i]);
//       console.log(topAttk10);
//     }

//     pokeData.push({
//       name: pokename,
//       id: data.id,
//       sprites: spritesCont,
//       moves: movesData,
//     });
//   }

//   res.render("pokedex", { pokeData });
// });
