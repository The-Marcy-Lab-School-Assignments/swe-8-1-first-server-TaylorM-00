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
const filepath = path.join(__dirname, "../vite-project/dist");

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers
/////////////////////////////////////////////////////////////////////////////////////////////////
// controllers
const servePicture = (req, res) => {
  // console.log(req.query);
  res.send(
    `https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg`
  );
};
const serveJoke = (req, res) => {
  res.json({
    setup: "What happens to an illegally parked frog?",
    punchline: "It gets toad away.",
  });
};
const serveRollDie = (req, res) => {
  const { num } = req.query;
  if (!num) {
    return res.send("hi");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
// endpoint 1
app.get("/api/picture", servePicture);

// // endpoint 2
app.get("/api/joke", serveJoke);

// // endpoint 3
app.get("/api/rollDice", serveRollDie);

// port
const PORT = 8080;

//listener
app.listen(PORT, () => {
  console.log(`listing at http://localhost:${PORT}`);
});
