"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};
//'pre' hook : its doing the updateAvailability()'s task automatically
bookSchema.pre("save", function (next) {
    this.available = this.copies > 0;
    console.log(`Book "${this.title}", pre-save hook: availability set to ${this.available}`);
    next();
});
// 'post' hook
bookSchema.post("save", function (doc) {
    console.log(`Book "${doc.title}", post-save hook: left ${doc.copies} copies available`);
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
