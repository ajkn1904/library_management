import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

const bookSchema = new Schema<IBooks>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  copies: {
    type: Number,
    required: [true, 'Number of copies is required'],
    min: [0, "Copies must be a positive number"],
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

bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
}

export const Book = model<IBooks>("Book", bookSchema);
