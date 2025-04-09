const express = require("express");
const app = express();

//middleware

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
///
// The path module is useful for constructing relative filepaths
const path = require("path");

// the filepath is to the entire assets folder
const filepath = path.join(__dirname, "../frontend/dist");

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

/////////////////////////////////////////////////////////////////////////////////////////////////
// controllers
//Picture
const servePicture = (req, res) => {
  // console.log(req.query);
  res.send({
    src: `https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg`,
  });
};
//Joke
const serveJoke = (req, res) => {
  // res.json({
  //   setup: "What happens to an illegally parked frog?",
  //   punchline: "It gets toad away.",
  // });
  res.send({
    setup: "What happens to an illegally parked frog?",
    punchline: "It gets toad away.",
  });
};
//Roll the Dice
const serveRollDice = (req, res) => {
  // const { num } = req.query;
  // if (!num) {
  //   return res.send("hi");
  // }
  // const  quantity = req.query.quantity
  // req.query = {
  //   quantity: 3
  // }
  const { quantity } = req.query;
  const length = Number(quantity) > 0 ? Number(quantity) : 1;
  const rolls = [];
  for (let i = 0; i < length; i++) {
    const roll = Math.ceil(Math.random() * 6);
    rolls.push(roll);
  }
  res.send(rolls);
};

///////////////////////////////////////////////////////////////////////////////////////////////
// endpoint 1
app.get("/api/picture", servePicture);

// // endpoint 2
app.get("/api/joke", serveJoke);

// // endpoint 3
app.get("/api/rollDie", serveRollDice);

// port
const PORT = 8080;

//listener
app.listen(PORT, () => {
  console.log(`listing at http://localhost:${PORT}`);
});
