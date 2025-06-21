import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/books.model';
import { Borrow } from '../models/borrow.model';


export const borrowRoutes = express.Router()

borrowRoutes.post('/', async(req: Request, res: Response, next: NextFunction) => {
try {
    const {book: bookId, quantity, dueDate} = req.body;

    const book = await Book.findById(bookId);
    
    if (!book) {
        res.status(404).json({
        success: false,
        message: 'Book not found',
        error: null
      });
    } else if(book?.copies < quantity){
        res.status(400).json({
        success: false,
        message: 'Not enough copies available',
        error: null
      });
    }

    if(book?.available){
        book.copies = book?.copies - quantity;
        book?.updateAvailability();
        await book?.save()
    } 
    

    const data = await Borrow.create({book: book?._id, quantity, dueDate})


    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data
    })

} catch (error) {
    next(error);
}
})