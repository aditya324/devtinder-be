const express = require("express");

const { adminAuth } = require("./middleware/auth");

const connectDB = require("./config/database.js");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const User = require("./models/user.js");
const app = express();

const { validateSignupData } = require("./utils/validation.js");

app.use(express.json());

connectDB();

app.post("/signup", async (req, res) => {
  try {
    const userObj = req.body;

    console.log(validateSignupData(req));

    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    userObj.password = passwordHash;

    if (req.body.emailId) {
      const user = await User.findOne({ emailId: req.body.emailId });

      if (user) {
        return res.send({ message: "User already exists" }, 400);
      }
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: passwordHash,
    });
    await user.save();

    res.send({ user, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.send("Error occurred" + error);
  }
});

//get USer By EMail

app.get("/email", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ emailId: userEmail }).exec();
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send("Error occurred", error);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.send("Please provide user id");
    }

    const deluser = await User.findByIdAndDelete(userId);

    if (!deluser) {
      return res.send("User not found");
    }
    res.send("User deleted successfully");
  } catch (error) {
    res.send("Error occurred", error);
  }
});

app.patch("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body; // Extract userId separately

    if (!userId) {
      return res.status(400).send("Please provide user ID");
    }

    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    // Validate that at least one valid key is provided
    const isValidUpdate =
      Object.keys(data).length > 0 &&
      Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

    if (!isValidUpdate) {
      return res.status(400).send("Invalid updates");
    }

    if (data?.skills?.length > 10) {
      return res.status(400).send("Skills should not be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.send("Please provide email and password");
    }

    

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Invalid credentials");
    }

    res.send("Logged in successfully");

  } catch (error) {
    console.log(error);
    res.send("Error occurred", error);
  }
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
