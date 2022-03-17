const mongoose = require("mongoose");

const Userprofile = require("./signup/users.js");

mongoose
  .connect("mongodb://localhost:27017/pokemon")
  .then(() => {
    console.log("Mongo conection open");
  })
  .catch((err) => {
    console.error("Mongo error");
    console.log(err);
  });

// const p = new Userprofile({
//   username: "Guest",
//   email: "guest@hotmail.com",
//   password: "guest1234",
// });

// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//     console.log("error");
//   });
// My God that worked!!

const seedUserprofile = [
  {
    username: "Brock",
    email: "brock@hotmail.com",
    password: "brock1234",
  },
  {
    username: "Misty",
    email: "misty@hotmail.com",
    password: "misty1234",
  },
  {
    username: "Ash",
    email: "ash@hotmail.com",
    password: "ash1234",
  },
];

Userprofile.insertMany(seedUserprofile)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
    console.error("A db error has occured");
  });
