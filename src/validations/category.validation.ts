import Joi from "joi";

const create = {
    body: Joi.object().keys({
        title: Joi.string().required(),
    })
}

const getCategories = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getCategory = {
    params: Joi.object().keys({
        categoryId: Joi.number().integer()
    })
}

const updateCategory = {
    params: Joi.object().keys({
        categoryId: Joi.number().integer()
    }),
    body: Joi.object().keys({
        title: Joi.string(),
    }).min(1)
}

const deleteCategory = {
    params: Joi.object().keys({
        categoryId: Joi.number().integer()
    })
}

export default {
    create,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}
