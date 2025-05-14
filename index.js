const express = require("express");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
const Task = require("./models/task");

mongoose
  .connect("mongodb://127.0.0.1:27017/goal-tracker")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method")); // override with POST having ?_method=DELETE

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.render("tasks/index", { tasks });
});

app.post("/tasks", async (req, res) => {
  await Task.create(req.body.task);
  res.redirect("/tasks");
});

app.get("/tasks/:id/edit", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.render("tasks/edit", { task });
});

app.patch("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, {
    ...req.body.task,
  });
  res.redirect("/tasks");
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000);
