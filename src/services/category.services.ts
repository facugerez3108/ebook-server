import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import prisma from "../client";
import { Category } from "@prisma/client";

const createCategory = async (
    id: number,
    title: string,
): Promise<Category> => {
    if(await getCategoryById(id)){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exists')
    }

    return prisma.category.create({
        data: {
            title
        }
    })
}


const getCategoryById = async <Key extends keyof Category>(
    id: number,
    keys: Key[] = ['id', 'title', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Category, Key> | null> => {
    return prisma.category.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Category, Key> | null>;
}


const queryCategories = async <Key extends keyof Category>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id', 
        'title', 
        'createdAt', 
        'updatedAt'
    ] as Key[]
): Promise<Pick<Category, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';

    const categories = await prisma.category.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return categories as Pick<Category, Key>[];
}

const updateCategory = async (
    id: number,
    title: string
): Promise<Category> => {
    const category = await getCategoryById(id);
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    
    return prisma.category.update({
        where: { id },
        data: {
            title
        }
    })
}

const deleteCategory = async (
    id: number
): Promise<Category> => {
    const category = await getCategoryById(id);
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }

    return prisma.category.delete({
        where: { id }
    })
}


export default {
    createCategory,
    getCategoryById,
    queryCategories,
    updateCategory,
    deleteCategory
}