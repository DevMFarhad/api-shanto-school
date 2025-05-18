import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import baseAPI from './baseAPI';
import { AcademicRoutes } from '../modules/academic/academic.route';

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
        router: AcademicRoutes,
        path: '/academic',
    },
];

appRoutes.forEach((route) => AppRouter.use(route.path, route.router));

export default AppRouter;
