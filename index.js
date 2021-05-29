const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

//Connection URL
const CONNECTION_URL =
  "mongodb+srv://youtube:Z@no72754@cluster0.nagym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Connection TO DB
mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DATABSE")
);

//Routes
const register = require("./routes/resgister");
const login = require("./routes/login");
const profile = require("./routes/profile");
app.use("/profile", profile);
app.use("/login", login);
app.use("/register", register);

app.listen(4000, () => {
  console.log("Up & Running * 4000");
});
