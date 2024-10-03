const express = require("express");
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

// For testing

// app.get("/testTask", async (req, res) => {
//   const t = new Task({
//     name: "Work on 1 personal project for 2 hours",
//   });
//   await t.save();
//   res.send(t);
// });

app.get("/", (req, res) => {
  res.send("This is a goal tracker app");
});

app.listen(3000);
