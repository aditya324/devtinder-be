const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please provide all the details");
  } else if (firstName.length < 4 || lastName.length < 4) {
    throw new Error("First Name and Last Name should be atleast 4 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }


 
};

module.exports = { validateSignupData };
