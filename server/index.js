const express = require("express");
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://hammad:471754@mern-crud.78v8i5l.mongodb.net/crud?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/", async (req, res) => {
  const food = new FoodModel({
    foodName: "Apple",
    eatingDays: 3,
  });

  try {
    await food.save();
    res.send("Data inserted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
