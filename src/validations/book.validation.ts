import Joi from 'joi';

const createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        autor: Joi.string().required(),
        code: Joi.number().required(),
        categoryId: Joi.number().integer(),
        cantidad: Joi.number().required()
    })
}

const getBooks = {
    query: Joi.object().keys({
        title: Joi.string(),
        autor: Joi.string(),
        code: Joi.number(),
        categoryId: Joi.number().integer(),
        cantidad: Joi.number()
    })
}

const getBook = {
    params: Joi.object().keys({
        bookId: Joi.number().integer()
    })
}

const editBook = {
    params: Joi.object().keys({
        bookId: Joi.number().integer()
    }),
    body: Joi.object()
        .keys({
            title: Joi.string(),
            autor: Joi.string(),
            code: Joi.number(),
            categoryId: Joi.number().integer(),
            cantidad: Joi.number()
        })
        .min(1)
}

const deleteBook = {
    params: Joi.object().keys({
        bookId: Joi.number().integer()
    })
}

export default {
    createBook,
    getBook,
    getBooks,
    editBook,
    deleteBook
}
