const express = require("express");

const {adminAuth} = require("./middleware/auth");

const app = express();






app.get("/admin/getAllUsers", adminAuth, (req, res)=>{

  console.log("all user logic here")
  res.send("All users logic")
})

app.get("/user", (req, res)=>{})



app.post("/admin/Adduser",adminAuth,(req, res)=>{

  console.log("add all user logic here")
  res.send("Add users logic")
})


app.get("/user", (req, res)=>{
  console.log("user logic here")
  res.send("user logic")
})









  





app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
