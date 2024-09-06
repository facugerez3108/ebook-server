import Joi from "joi";
import { PrestamoType } from "@prisma/client";


const createPrestamo = {
    body: Joi.object().keys({
        fechaPrestamo: Joi.date().required(),
        fechaDevolucion: Joi.date().required(),
        status: Joi.string().valid(PrestamoType.PENDIENTE, PrestamoType.DEVUELTO),
        compradorId: Joi.number().required(),
        bookId: Joi.number().required(),
        codigo: Joi.string().required(),
    })
}

const getPrestamos = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        codigo: Joi.string(),
        status: Joi.string().valid(PrestamoType.PENDIENTE, PrestamoType.DEVUELTO),
    }),
}

const getUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer(),
    }),
}

const updatePrestamo = {
    params: Joi.object().keys({
        prestamoId: Joi.number().integer(),
    }),
    body: Joi.object()
        .keys({
            fechaPrestamo: Joi.date(),
            fechaDevolucion: Joi.date(),
            status: Joi.string().valid(PrestamoType.PENDIENTE, PrestamoType.DEVUELTO),
        })
        .min(1),
}

const deletePrestamo = {
    params: Joi.object().keys({
        prestamoId: Joi.number().integer(),
    }),
}


export default {
    createPrestamo,
    getPrestamos,
    getUser,
    updatePrestamo,
    deletePrestamo
}   
