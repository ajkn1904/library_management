import express, { Application, NextFunction, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import mongoose from "mongoose";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App!");
});



//Global error handler --> Generic Error Response
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorResponse = {
    success: false,
    message: error.message,
    error,
  };
  if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorResponse.message = "Validation failed";
  }
  res.status(statusCode).json(errorResponse);
  next();
});

export default app;
