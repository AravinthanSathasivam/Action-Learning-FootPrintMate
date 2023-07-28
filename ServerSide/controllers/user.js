
const User = require("../models/user")
const {validationResult} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')


const signup = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array()[0].msg
        });
      }
  
      const { email, password } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).send("User already registered.");
      }
  
      const user = new User(req.body);
      const savedUser = await user.save();
  
      return res.json({
        message: "Success",
        user: savedUser
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };
  

const signin = async (req, res) => {
   
    try {
      console.log(req.body)
    let { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          error: "Email was not found"
        });
      }
  
      //Authenticate the user
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Email and password do not match"
        });
      }
  
      // Create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  
      // Put token into cookie
      res.cookie('token', token, { expire: new Date() + 1 });
  
      // Send response
      const { _id, name } = user;
      return res.json({
        user: {
          _id,
          name,
          email,
        }
      });
    } catch (err) {
      console.log('this is error',err);
      res.status(500).send("Something went wrong");
    }
  };
  
  

const signout = (req,res) => {
    res.clearCookie("token")
    return res.json({
        message:"User signout successfully"
    })
};

module.exports = {
    signup,
    signin,
    signout,
  };
