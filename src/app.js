const express = require("express");

const { adminAuth } = require("./middleware/auth");

const connectDB = require("./config/database.js");

const User = require("./models/user.js");
const app = express();

app.use(express.json());

connectDB();

app.post("/signup", async (req, res) => {
  try {
    const userObj = req.body;

    if (
      !userObj.firstName ||
      !userObj.lastName ||
      !userObj.emailId ||
      !userObj.password ||
      !userObj.age
    ) {
      return res.status(400).send("Please provide all the details");
    }

    if (userObj.password.length < 6) {
      return res.send({ message: "Password should be atleast 6 characters" }, 400);
    }

    if (req.body.emailId) {
      const user = await User.findOne({ emailId: req.body.emailId });

      if (user) {
        return res.send({ message: "User already exists" }, 400);
      }
    }

    const user = new User(userObj);
    await user.save();

    res.send({ user, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.send("Error occurred"+ error);
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
    const userId = req.params.id

    if(!userId){
      return res.send("Please provide user id")
    }

    const deluser= await User.findByIdAndDelete(userId)

    if(!deluser){
      return res.send("User not found")
    }
    res.send("User deleted successfully")
    
  } catch (error) {
    res.send("Error occurred", error);
  }
});


app.patch("/updateUser/:id", async (req, res) => {
  try {

    const userId= req.params.id;
    const data = req.body; // Extract userId separately

    if (!userId) {
      return res.status(400).send("Please provide user ID");
    }

    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    // Validate that at least one valid key is provided
    const isValidUpdate = Object.keys(data).length > 0 && Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

    if (!isValidUpdate) {
      return res.status(400).send("Invalid updates");
    }


    if(data?.skills?.length>10){
      return res.status(400).send("Skills should not be more than 10")
    }


    const user = await User.findByIdAndUpdate(
      userId,
      data,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
