import {RequestHandler} from "express";
import  Book from '../models/book';

export const createBook: RequestHandler = async (req, res, next) => {

    try {

        const book = req.body

        const bookExist = await Book.findOne({ where: { title: book.title } });

        if (bookExist) {
            return res.status(400).json({
                msg: `Book with title '${book.title}' already exists!`
            });
        }

        await Book.create({...req.body});
        return res.status(200).json({msg: "Book created successfully.", data: book});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Failed to create book."});
    }
}

export const deleteBook: RequestHandler = async (req, res, next) => {

    try {
        const {id} = req.params;

        const bookExist = await Book.findOne({ where: { id } });

        if (!bookExist) {
            return res.status(404).json({
                msg: `Book with id '${id}' not found!`
            });
        }

        const book: Book | null = await Book.findByPk(id);
        await Book.destroy({ where: { id } });

        return res.status(200).json({ msg: "Books deleted successfully.", data: book });

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Failed to delete book."});
    }
};

export const getAllBooks: RequestHandler = async (req, res, next) => {

    try {
        const allBooks: Book[] = await Book.findAll();
        return res.status(200).json({msg: "Books get all books successfully.", data: allBooks});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Failed get all books."});
    }
};

export const getBookById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const book: Book | null = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({msg: `Book with id '${id}' not found.`});
        }
        return res.status(200).json({msg: "Book get successfully.", data: book});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Failed to fetch book."});
    }
};

export const updateBook: RequestHandler = async (req, res, next) => {
    const {id} = req.params;

    try {
        const book: Book | null = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                msg: `Book with id '${id}' not found!`
            });
        }

        const updatedBook = await Book.update({...req.body}, {where: {id}});
        return res.status(200).json({ msg: "Book updated successfully.", data: updatedBook });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Failed to update book." });
    }
};
