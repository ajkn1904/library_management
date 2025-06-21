"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
//Create Book
exports.booksRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
//Get All Books
exports.booksRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = [];
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10 } = req.query;
        if (filter) {
            data = yield books_model_1.Book.find({ genre: { $regex: `^${filter}$`, $options: "i" } }).sort({ [sortBy]: sort === "asc" ? 1 : -1 }).limit(Math.max(1, parseInt(limit) || 10));
        }
        else {
            data = yield books_model_1.Book.find();
        }
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get Book by ID
exports.booksRoutes.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield books_model_1.Book.findById(id);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Update Book
exports.booksRoutes.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const newBody = req.body;
        const data = yield books_model_1.Book.findByIdAndUpdate(id, newBody, { new: true });
        if (data && newBody.copies > 0) {
            data.available = true;
            yield (data === null || data === void 0 ? void 0 : data.save());
        }
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Delete Book
exports.booksRoutes.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield books_model_1.Book.deleteOne({ _id: id });
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}));
