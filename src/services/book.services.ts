import { Book, Category, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import prisma from "../client";

const createBook = async (
    title: string,
    autor: string,
    categoryId: number,
    code: string,
    cantidad: number,
): Promise<Book> => {
    if(await getBookByTitle(title)){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exists')
    }

    return prisma.book.create({
        data: {
            title,
            autor,
            category: {
                connect: {
                    id: categoryId
                }
            },
            code,
            cantidad
        }
    })
}

const getBookById = async <Key extends keyof Book>(
    id: number,
    keys: Key[] = [
        'id', 
        'title', 
        'autor', 
        'code', 
        'cantidad', 
        'createdAt', 
        'updatedAt'
    ] as Key[]
): Promise<Pick<Book, Key> | null> => {
    return prisma.book.findUnique({
        where: {
            id
        },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Book, Key> | null>
}

const getBookByTitle = async <Key extends keyof Book>(
    title: string,
    keys: Key[] = [
        'id',
        'title',
        'autor',
        'code',
        'cantidad',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Book, Key> | null> => {
    return prisma.book.findUnique({
        where: {
            title
        },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Book, Key> | null>
}

const queryBooks = async <Key extends keyof Book>(
    filter: object = {},
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id',
        'title',
        'autor',
        'code',
        'cantidad',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Book, Key>[]> => {
   const page = options.page ?? 1;
   const limit = options.limit ?? 10;
   const sortBy = options.sortBy;
   const sortType = options.sortType ?? 'desc';
   const books = await prisma.book.findMany({
       where: Object.keys(filter).length ? filter : {},
       select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
       skip: (page - 1) * limit,
       take: limit,
       orderBy: sortBy ? { [sortBy]: sortType } : undefined
   })
   return books as Pick<Book, Key>[];
}


const updateBook = async <Key extends keyof Book>(
    id: number,
    updateBody: Prisma.BookUpdateInput,
    keys: Key[] = [
        'id',
        'title',
        'autor',
        'code',
        'cantidad',
    ] as Key[]
): Promise<Pick<Book, Key> | null> => {
    const book = await getBookById(id, ['autor', 'cantidad', 'title', 'categoryId', 'code']);
    
    if(!book){
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
    }

    if(updateBody.title && (await getBookByTitle(updateBody.title as string))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exists')
    }
    
    const updatedBook = await prisma.book.update({
        where: { id: id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });

    return updatedBook as Pick<Book, Key> | null;
}

const deleteBook = async (id: number): Promise<Book> => {
    const book = await getBookById(id);
    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    await prisma.book.delete({ where: { id: book.id } });
    return book;
}


export default {
    createBook,
    getBookById,
    getBookByTitle,
    queryBooks,
    updateBook,
    deleteBook
}