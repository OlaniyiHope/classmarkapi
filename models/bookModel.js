import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  authorName: {
    type: String,
  },
  language: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
  },

  Download: {
    type: String,
  },
  imageUrl: {
    type: "string",
  },
  price: {
    type: "Number",
  },
});

const Book = mongoose.model("Book", bookSchema); // Change "School" to "Account"

export default Book;
