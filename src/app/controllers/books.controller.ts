import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

//Create Book
booksRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const data = await Book.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Get All Books
booksRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = [];
      const {filter, sortBy = "createdAt", sort = "desc", limit = 10} = req.query;

      if (filter) {
        data = await Book.find({genre: { $regex: `^${filter}$`, $options: "i" }}).sort({ [sortBy as string]: sort === "asc" ? 1 : -1 }).limit(Math.max(1, parseInt(limit as string) || 10));
      } else {
        data = await Book.find();
      }

      

      res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get Book by ID
booksRoutes.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const data = await Book.findById(id);

      res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update Book
booksRoutes.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const newBody = req.body;
      const data = await Book.findByIdAndUpdate(id, newBody, { new: true });

      res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Book
booksRoutes.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const data = await Book.deleteOne({ _id: id });

      res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
