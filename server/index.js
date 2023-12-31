const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const FoodModel = require("./models/Food");
const { update } = require("./models/Food");

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(
  "mongodb+srv://hammad:B3Aomisf1SDohVrD@cluster0.4itebyb.mongodb.net/Todo?retryWrites=true&w=majority",
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
    res.send("Data inserted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
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

app.put("/editFoodName", async (req, res) => {
  const id = req.body.id;
  const newFoodName = req.body.foodName;

  try {
    const updatedFood = await FoodModel.findById(id);

    if (!updatedFood) {
      return res.status(404).send("Food not found");
    }

    updatedFood.foodName = newFoodName;
    await updatedFood.save();

    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.delete("/deleteFood/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndDelete(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
