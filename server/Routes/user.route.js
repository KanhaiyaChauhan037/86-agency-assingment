const express = require("express");
const { UserModel } = require("../Models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  //   console.log("req.body", req.body);
  const { name, email, bio, password } = req.body;
  const check_exist = await UserModel.find({ email });
  try {
    if (check_exist.length > 0) {
      res.status(404).send({ response: "user already created please login" });
    } else {
      //we required bcryt package for hasing password
      bcrypt.hash(password, 4, async function (err, hash) {
        // Store hash in your password DB.
        const userDetails = new UserModel({ name, email, bio, password: hash });
        await userDetails.save();
        res.status(200).send({ response: "user created successfully" });
      });
    }
  } catch (error) {
    console.log("err", error);
    res.status(404).send("Something went wrong please try again");
  }
});

userRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const check_exist = await UserModel.find({ email });

  if (check_exist.length > 0) {
    try {
      //compare user password with hased password
      const hased_password = check_exist[0].password;
      bcrypt.compare(password, hased_password, function (err, result) {
        // result == true if password matched
        if (result) {
          //genrate a token using jwt package and send back to user
          var token = jwt.sign({ userID: check_exist[0]._id }, "secret");
          res.send({
            response: "You are successfully logged in",
            token: token,
          });
        } else {
          res.status(404).send({ response: "Invalid Credential" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(404).send("Something went wrong please try again");
    }
  } else {
    res.status(400).send({ response: "Please signup first" });
  }
});

// getall users
userRouter.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve a user by id
userRouter.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await UserModel.findById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send({ msg: "Something went wrong" });
  }
});

// Update a user's details by id
userRouter.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updatedUser = await UserModel.findById(id);
    updatedUser.name = req.body.name;
    updatedUser.email = req.body.email;
    updatedUser.bio = req.body.bio;
    updatedUser.updated_at = Date.now();

    await UserModel.findByIdAndUpdate({ _id: id }, updatedUser);
    return res.send({ msg: "User Detailed Updated successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Delete a user by id
userRouter.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Retrieve the total number of user
userRouter.get("/analytics/users", async (req, res) => {
  try {
    const count = await UserModel.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Retrieve the top 5 most liked user
userRouter.get("/analytics/users/top-liked", async (req, res) => {
  try {
    const user = await UserModel.find().sort({ likes: -1 }).limit(5);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
userRouter.get("/analytics/users/top-active", async (req, res) => {
  try {
    const users = await UserModel.find().sort("-posts").limit(5);
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = { userRouter };
