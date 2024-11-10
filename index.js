const express = require("express");
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
app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.send("Data Received");
});
app.listen(3000);
