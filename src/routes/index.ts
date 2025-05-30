import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import baseAPI from './baseAPI';
import { ClassRoutes } from '../modules/class/class.route';

interface IRouter {
    router: Router;
    path: string;
}

const AppRouter = Router();

const appRoutes: IRouter[] = [
    {
        router: baseAPI,
        path: '/',
    },
    {
        router: AuthRouter,
        path: '/auth',
    },
    {
        router: ClassRoutes,
        path: '/classes',
    },
];

appRoutes.forEach((route) => AppRouter.use(route.path, route.router));

export default AppRouter;
