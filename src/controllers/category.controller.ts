import httpStatus from "http-status";
import catchAsync from "utils/catchAsync";
import { categoryService } from "../services";
import ApiError from "utils/ApiError";
import pick from "utils/pick";

const createCategory = catchAsync(async (req, res) => {
    const { title } = req.body;
    const category = await categoryService.createCategory(title);
    res.status(httpStatus.CREATED).send(category);
});

const getCategory = catchAsync(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    res.send(category);
});

const getCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['title']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const categories = await categoryService.queryCategories(filter, options);
    res.send(categories);
});

const updateCategory = catchAsync(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    const category = await categoryService.updateCategory(categoryId, req.body);
    res.send(category);
});


const deleteCategory = catchAsync(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10);
    await categoryService.deleteCategory(categoryId);
    res.status(httpStatus.NO_CONTENT).send();
});


export default {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
}