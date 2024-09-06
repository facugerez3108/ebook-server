import httpStatus from "http-status";
import pick from "utils/pick";
import ApiError from "utils/ApiError";
import catchAsync from "utils/catchAsync";
import { bookService } from "../services";

const createBook = catchAsync(async(req, res) => {
    const {title, autor, categoryId, code, cantidad} = req.body;
    const book = await bookService.createBook(title, autor, categoryId, code, cantidad);
    res.status(httpStatus.CREATED).send(book);
});

const getBook = catchAsync(async(req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await bookService.getBookById(bookId);
    if(!book){
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    res.send(book);
});

const getBooks = catchAsync (async (req, res) => {
    const filter = pick(req.query, ['title', 'autor', 'categoryId', 'code']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await bookService.queryBooks(filter, options);
    res.send(result);
})

const editBook = catchAsync(async(req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await bookService.updateBook(bookId, req.body);
    res.send(book);
});

const deleteBook = catchAsync(async(req, res) => {
    const bookId = parseInt(req.params.id, 10);
    await bookService.deleteBook(bookId);
    res.status(httpStatus.NO_CONTENT).send();
});


export default {
    createBook,
    getBook,
    getBooks,
    editBook,
    deleteBook
}