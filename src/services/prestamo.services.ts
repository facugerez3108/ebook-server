import { Prisma, Prestamo, PrestamoType } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import prisma from '../client';


const createPrestamo = async (
    compradorId: number,
    bookId: number,
    fechaPrestamo: Date,
    fechaDevolucion: Date,
    codigo: string,
    status: PrestamoType
): Promise<Prestamo> => {
    if (await getPrestamoByCode(codigo)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Prestamo already exists');
    }
    return prisma.prestamo.create({
        data:{
            compradorId,
            bookId,
            fechaPrestamo,
            fechaDevolucion,
            codigo,
            status
        }
    })
}

const getPrestamoByCode = async <Key extends keyof Prestamo>(
    codigo: string,
    keys: Key[] = [
        'id', 
        'compradorId', 
        'bookId', 
        'fechaPrestamo', 
        'fechaDevolucion', 
        'codigo', 
        'status'
    ] as Key[]
): Promise<Pick<Prestamo, Key> | null> => {
    return prisma.prestamo.findUnique({
        where: { codigo },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Prestamo, Key> | null>;
}

const getPrestamoById = async <Key extends keyof Prestamo>(
    id: number,
    keys: Key[] = [
        'id',
        'compradorId',
        'bookId',
        'fechaPrestamo',
        'fechaDevolucion',
        'codigo',
        'status'
    ] as Key[]
): Promise<Pick<Prestamo, Key> | null> => {
    return prisma.prestamo.findUnique({
        where: { id: id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Prestamo, Key> | null>;
}

const queryPrestamos = async <Key extends keyof Prestamo>(
    filter: object = {},
    options: {
        sortBy?: string;
        limit?: number;
        page?: number;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
        'id',
        'compradorId',
        'bookId',
        'fechaPrestamo',
        'fechaDevolucion',
        'codigo',
        'status'
    ] as Key[]
): Promise<any[]> => {
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const limit = options.limit ?? 10;
    const page = options.page ?? 1;

    const prestamos = await prisma.prestamo.findMany({
        where: Object.keys(filter).length ? filter : {},
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
        skip: (page - 1) * limit,
        take: limit,
        select: {
            id: true,
            fechaPrestamo: true,
            fechaDevolucion: true,
            codigo: true,
            status: true,
            comprador: { 
                select: {
                    nombre: true,
                    apellido: true,
                    codigo: true
                }
            },
            book: {
                select: {
                    title: true,
                    autor: true,
                    code: true,
                    cantidad: true
                }
            }
        }
    });
    return prestamos;
}

const updatePrestamoById = async <Key extends keyof Prestamo>(
    id: number,
    updateBody: Prisma.PrestamoUpdateInput,
    keys: Key[] = [
        'id',
        'compradorId',
        'bookId',
        'fechaPrestamo',
        'fechaDevolucion',
        'codigo',
        'status'
    ] as Key[]
):Promise<Pick<Prestamo, Key> | null> => {
    const prestamo = await getPrestamoById(id, [
        'bookId', 
        'codigo', 
        'compradorId', 
        'fechaDevolucion', 
        'fechaPrestamo', 
        'id', 
        'status'
    ]);
    
    if(!prestamo){
        throw new ApiError(httpStatus.NOT_FOUND, 'Prestamo not found');
    }

    if(updateBody.codigo && (await getPrestamoByCode(updateBody.codigo as string))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Prestamo already exists');
    }

    const updatedPrestamo = await prisma.prestamo.update({
        where: { id: id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedPrestamo as Pick<Prestamo, Key> | null;
}

const deletePrestamoById = async (id: number): Promise<Prestamo> => {
    const prestamo = await getPrestamoById(id);
    if(!prestamo){
        throw new ApiError(httpStatus.NOT_FOUND, 'Prestamo not found');
    }
    await prisma.prestamo.delete({ where: { id: id } });
    return prestamo;   
}


export default {
    createPrestamo,
    getPrestamoByCode,
    getPrestamoById,
    queryPrestamos,
    updatePrestamoById,
    deletePrestamoById
}
