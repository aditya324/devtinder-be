const express = require("express");

const app = express();

app.use("/test",(req, res) => {
  res.send("Hello Express! abcd22");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
