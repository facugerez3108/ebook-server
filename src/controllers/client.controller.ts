import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { clientService } from "../services";
import { Request, Response } from 'express';

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
    const id = parseInt(req.params.id, 10);
    const client = await clientService.getClientById(id);
    if (!client) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Client not found');
    }
    res.send(client);
})

const updateClient = async(req: Request, res: Response) => {
   const { id } = req.params;
   const updateBody = req.body;

   try{
    const updateUser = await clientService.updateClientById(parseInt(id), updateBody);
    res.json(updateUser);
   }catch(err){
    console.error('Error al actualizar el cliente', err);   
   }
};

const deleteClient = catchAsync(async(req, res) => {
    const id = parseInt(req.params.id, 10);
    await clientService.deleteClientById(id);
    res.status(httpStatus.NO_CONTENT).send();
});

//fuck vercel
//fuck vercel all my homies use render

export default {
    createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}