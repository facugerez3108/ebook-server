import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { clientService } from "../services";

const createClient = catchAsync(async(req, res) => {
    const {codigo, nombre, apellido} = req.body;
    const client = await clientService.createClient(codigo, nombre, apellido);
    res.status(httpStatus.CREATED).send(client);
});

const getClients = catchAsync(async(req, res) => {
    const filter = pick(req.query, ["codigo", "nombre", "apellido"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await clientService.queryClients(filter, options);
    res.send(result);
});

const getClient = catchAsync(async(req, res) => {
    const clientId = parseInt(req.params.clientId, 10);
    const client = await clientService.getClientById(clientId);
    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }
    res.send(client);
})

const updateClient = catchAsync(async(req, res) => {
    const clientId = parseInt(req.params.clientId, 10);
    const client = await clientService.updateClientById(clientId, req.body);
    res.send(client);
});

const deleteClient = catchAsync(async(req, res) => {
    const clientId = parseInt(req.params.clientId, 10);
    await clientService.deleteClientById(clientId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}