import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

//Create Book
booksRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
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
  });

//Get All Books
booksRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    
      const data = await Book.find();

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
