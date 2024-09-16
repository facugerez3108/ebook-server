import { Comprador, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";

const createClient = async (
    codigo: string,
    nombre: string,
    apellido: string,
): Promise<Comprador> => {
    if (await getClientByCode(codigo)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Client already exists");
    }
    return prisma.comprador.create({
        data: {
            codigo,
            nombre,
            apellido,
        },
    });
};

const getClientByCode = async <Key extends keyof Comprador>(
    codigo: string,
    keys: Key[] = [
        'id', 
        'codigo', 
        'nombre', 
        'apellido', 
        'createdAt', 
        'updatedAt'
    ] as Key[]
): Promise<Pick<Comprador, Key> | null> => {
    return prisma.comprador.findUnique({
        where: { codigo: codigo },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<Comprador, Key> | null>;
};

const getClientById = async <Key extends keyof Comprador> (
    id: number,
    keys: Key[] = [
        'id',
        'codigo',
        'nombre',
        'apellido',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Comprador, Key> | null> => {
    return prisma.comprador.findUnique({
        where: { id: id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<Comprador, Key> | null>;
};

const queryClients = async <Key extends keyof Comprador>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id',
        'codigo',
        'nombre',
        'apellido',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<Comprador, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy ?? 'createdAt';
    const sortType = options.sortType ?? 'desc';
    return prisma.comprador.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    }) as Promise<Pick<Comprador, Key>[]>;
};

const updateClientById = async <Key extends keyof Comprador>(
    clientId: number,
    updateBody: Prisma.CompradorUpdateInput,
    keys: Key[] = [
        'id',
        'codigo',
        'nombre',
        'apellido',
    ] as Key[]
): Promise<Pick<Comprador, Key> | null> => {
    const comprador = await getClientById(clientId, ['id', 'codigo', 'nombre', 'apellido']);
    if(!comprador){
        throw new ApiError(httpStatus.NOT_FOUND, 'Comprador not found');
    }
    if(updateBody.codigo && (await getClientByCode(updateBody.codigo as string))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Comprador already exists');
    }

    const updatedClient = await prisma.comprador.update({
        where: { id: clientId },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    });

    return updatedClient as Pick<Comprador, Key> | null;
};


const deleteClientById = async (clientId: number): Promise<Comprador> => {
    const comprador = await getClientById(clientId);
    if(!comprador){
        throw new ApiError(httpStatus.NOT_FOUND, 'Comprador not found');
    }
    await prisma.comprador.delete({ where: { id: clientId } });
    return comprador;
};

export default {
    createClient,
    getClientByCode,
    getClientById,
    queryClients,
    updateClientById,
    deleteClientById
};