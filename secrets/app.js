const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true, useUnifiedTopology: true });

userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});












app.listen(3000, function() {
  console.log("Server started on port 3000...");
});
