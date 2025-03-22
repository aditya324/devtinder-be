const express = require("express");

const { adminAuth } = require("./middleware/auth");

const connectDB = require("./config/database.js");

const User = require("./models/user.js");
const app = express();

connectDB();

app.post("/signup", async (req, res) => {
  const useObj = {
    firstName: "John",
    lastName: "Doe",
    emailId: "abcd@gmail.com",
    password: "1234",
    age: 25,
  };

  const user = new User(useObj);
  await user.save();

  res.send("User created successfully");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
