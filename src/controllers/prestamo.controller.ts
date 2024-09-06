import { prestamoService } from "../services";
import pick from "utils/pick";
import ApiError from "utils/ApiError";
import catchAsync from "utils/catchAsync";
import httpStatus from "http-status";


const createPrestamo = catchAsync(async(req, res) => {
    const {compradorId, bookId, fechaPrestamo, fechaDevolucion, codigo, status} = req.body;
    const prestamo = await prestamoService.createPrestamo(compradorId, bookId, fechaPrestamo, fechaDevolucion, codigo, status);
    res.status(httpStatus.CREATED).send(prestamo);
});

const getPrestamo = catchAsync(async(req, res) => {
    const prestamoId = parseInt(req.params.id, 10);
    const prestamo = await prestamoService.getPrestamoById(prestamoId);
    if(!prestamo){
        throw new ApiError(httpStatus.NOT_FOUND, 'Prestamo not found');
    }
    res.send(prestamo);
});

const getPrestamos = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['codigo', 'status']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await prestamoService.queryPrestamos(filter, options);
    res.send(result);
});

const updatePrestamo = catchAsync(async(req, res) => {
    const prestamoId = parseInt(req.params.id, 10);
    const prestamo = await prestamoService.updatePrestamoById(prestamoId, req.body);
    res.send(prestamo);
});

const deletePrestamo = catchAsync(async(req, res) => {
    const prestamoId = parseInt(req.params.id, 10);
    await prestamoService.deletePrestamoById(prestamoId);
    res.status(httpStatus.NO_CONTENT).send();
});


export default {
    createPrestamo,
    getPrestamo,
    getPrestamos,
    updatePrestamo,
    deletePrestamo
}