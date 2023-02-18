const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const FoodModel = require("./models/Food");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://hammad:471754@mern-crud.78v8i5l.mongodb.net/crud?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const eatingDays = req.body.eatingDays;

  const food = new FoodModel({
    foodName: foodName,
    eatingDays: eatingDays,
  });

  try {
    await food.save();
    // res.send("Data inserted");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
