const { log } = require("console");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fileSystem = require("fs");
const importJSON = fileSystem.readFileSync("data.json", "utf8");
const dataSource = JSON.parse(importJSON);
const mongoose = require("mongoose");
const budgetDataModel = require("./models/budget_model.js");

app.use(cors());

app.use("/", express.static("public"));

app.use(express.json());
// app.get('/hello', (req, res) => {
//   res.send('Hello World!');
// });

mongoose
  .connect("mongodb://127.0.0.1:27017/NBADdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.error("Error connecting to the Database:", err);
  });

app.get("/budget", (req, res) => {
  budgetDataModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/budget", (req, res) => {
  const data = req.body;

  Promise.all(
    data.map((itemData) => {
      const newItem = new budgetDataModel(itemData);
      return newItem.save();
    })
  )
    .then((savedItems) => {
      res.json("Added data Successfully");
      console.log(savedItems);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
