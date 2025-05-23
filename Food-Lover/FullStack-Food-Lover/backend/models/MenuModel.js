const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    slug: {
      type: String,
      required: [true, "Please add a slug"],
    },
    summary: {
      type: String,
      required: [true, "Please add a summary"],
    },
    instructions: {
      type: String,
      required: [true, "Please add instructions"],
    },
    creator_name: {
      type: String,
      required: [true, "Please add your name"],
    },
    creator_email: {
      type: String,
      required: [true, "Please add your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Menu", MenuSchema);
