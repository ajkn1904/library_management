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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
//Borrow a Book
exports.borrowRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: null
            });
        }
        else if ((book === null || book === void 0 ? void 0 : book.copies) < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                error: null
            });
        }
        if (book === null || book === void 0 ? void 0 : book.available) {
            book.copies = (book === null || book === void 0 ? void 0 : book.copies) - quantity;
            book === null || book === void 0 ? void 0 : book.updateAvailability();
            yield (book === null || book === void 0 ? void 0 : book.save());
            const data = yield borrow_model_1.Borrow.create({ book: book === null || book === void 0 ? void 0 : book._id, quantity, dueDate });
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
//Borrowed Books Summary (Using Aggregation)
exports.borrowRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
            { $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            { $lookup: {
                    from: "books",
                    localField: '_id',
                    foreignField: '_id',
                    as: 'data'
                }
            },
            { $unwind: '$data' }
        ]).project({
            _id: 0,
            book: {
                title: '$data.title',
                isbn: '$data.isbn'
            },
            totalQuantity: 1
        });
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data
        });
    }
    catch (error) {
        next(error);
    }
}));
