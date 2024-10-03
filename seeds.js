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

const seedDB = async () => {
  await Task.deleteMany();
  await Task.insertMany([
    { name: "Work on 1 personal project for 2 hours" },
    { name: "Work on 1 Frontend Mentor project for 2 hours" },
    { name: "Complete 1 section of online course on web development" },
    { name: "Solve 2 LeetCode problems" },
  ]);
};

seedDB().then(() => mongoose.connection.close());
