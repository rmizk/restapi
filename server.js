const express = require("express");
const connect = require("./config/connectDB");
const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });

var app = express();

app.use(express.json());

connect();

app.post("/ADD", async (req, res) => {
  const { firstName, lastName, email, phone, age } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      age,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.get("/GET", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/GET/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

app.put("/UPDATE/:id", async (req, res) => {
  try {
    const ediredUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(ediredUser);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/DELETE/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("user deleted ");
  } catch (error) {
    console.log(error);
  }
});

var PORT = process.env.PORT || 3001;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`Server running on port ${PORT}`)
);
