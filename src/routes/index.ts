import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import prestamoRoute from './prestamo.route';
import clientRoute from './client.route';
import categoryRoute from './category.route';
import bookRoute from './book.route';

const router = express.Router();


const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/prestamos',
        route: prestamoRoute
    },
    {
        path: '/libros',
        route: bookRoute
    },
    {
        path: '/categorias',
        route: categoryRoute
    },
    {
        path: '/clientes',
        route: clientRoute
    },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


export default router;