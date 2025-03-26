const mongoose = require("mongoose");
const validator = require("validator");
const userShema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:4,
    maxLength:50
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid" +value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    
    
  },
  age: {
    type: Number,
    min: 18,
    max: 100
  },

  gender: {
    type: String,
    validate(value){
      if(!["male", "female", "others"].includes(value)){
        throw new Error("gender data is not valid")
      }
    }
  },

  photoUrl:{
    type: String,
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("URL is not valid")
      }
    }
  },
  about:{
    type: String,
    default: "Hey there! I am using WhatsApp"
  },
  skills:{
    type: [String],
  }
} , {timestamps: true});


const User = mongoose.model("User", userShema);
module.exports = User;
