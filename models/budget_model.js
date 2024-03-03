const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          //  to check if value it is a  hexadecimal color code
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
        },
        message: "Invalid color format",
      },
    },
  },
  { collection: "data" }
);

module.exports = mongoose.model("data", modelSchema);
