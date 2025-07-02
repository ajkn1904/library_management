"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://library-management-iota-sage.vercel.app/']
}));
app.use("/api/books", books_controller_1.booksRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management App!");
});
//error 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
//Global error handler --> Generic Error Response
app.use((error, req, res, next) => {
    let statusCode = 500;
    let errorResponse = {
        success: false,
        message: error.message,
        error,
    };
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        errorResponse.message = "Validation failed";
    }
    res.status(statusCode).json(errorResponse);
    next();
});
exports.default = app;
