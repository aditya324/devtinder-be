const adminAuth = async (req, res, next) => {
  const token = "1234";

  const usertoken = "1234";

  console.log("token is being checked");

  if (token === usertoken) {
    next();
  } else {
    res.send("Not authorized");
  }
};

module.exports = { adminAuth };
