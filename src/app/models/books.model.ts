import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

const bookSchema = new Schema<IBooks>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  copies: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Copies must be an integer'
    }
  },
  available: {
    type: Boolean,
    default: true
  }
}
,
{
    versionKey: false,
    timestamps: true,
});

export const Book = model<IBooks>("Book", bookSchema);
