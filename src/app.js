const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000
//define paths for express
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebar
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDir));

//setup static directory to serve

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tres Bednarz"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tres Bednarz"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is very helpful",
    title: "Help",
    name: "Tres Bednarz"
  });
});

//weather endpoint
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forcastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tres Bednarz",
    errorMessage: "Help article not found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tres Bednarz",
    errorMessage: "Page Not Found"
  });
});
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
