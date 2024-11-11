const express = require("express");
const usermodel = require("./models/user");
const dbconnection = require("./config/db");
const morgan = require("morgan");
const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  await usermodel.create({
    username: username,
    email: email,
    password: password,
  });

  res.send("Registered");
});
app.get("/get-users", (req, res) => {
  usermodel
    .find({
      username: "a",
    })
    .then((users) => {
      res.send(users);
    });
});
app.get("/update", async (req, res) => {
  await usermodel.findOneAndUpdate(
    {
      username: "akash-singh",
    },
    {
      email: "akash@gmail.com",
    }
  );
});

app.get("/delete", async (req, res) => {
  await usermodel.findOneAndDelete({
    username: "akash-singh",
  });
  res.send("dleeted");
});
app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data Received");
});
app.listen(3000);
