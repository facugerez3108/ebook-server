import Joi from "joi";


const createClient = {
    body: Joi.object().keys({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        codigo: Joi.string().required(),
    })
}

const getClients = {
    query: Joi.object().keys({
        codigo: Joi.string(),
        nombre: Joi.string(),
        apellido: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
}

const getClient = {
    params: Joi.object().keys({
        clientId: Joi.number().integer()
    })
}

const editClient = {
    params: Joi.object().keys({
        clientId: Joi.number().integer()
    }),
    body: Joi.object().keys({
        nombre: Joi.string(),
        apellido: Joi.string(),
        codigo: Joi.string()
    })
}

const deleteClient = {
    params: Joi.object().keys({
        clientId: Joi.number().integer()
    })
}

export default {
    createClient,
    getClients,
    getClient,
    editClient,
    deleteClient
}