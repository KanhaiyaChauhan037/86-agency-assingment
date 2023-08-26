const express = require("express");
const { connection } = require("./config/database");
const { userRouter } = require("./Routes/user.route");
const { postRouter } = require("./Routes/post.route");
const { authorization } = require("./Middleware/auth");

require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5500;
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to 86 agency Social Media App..." });
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected To Database Successfully!!");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server Listing On PORT ${PORT}`);
});
