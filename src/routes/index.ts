import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";

interface IRouter {
    router: Router,
    path: string
}

const AppRouter = Router()

const appRoutes: IRouter[] = [
    {
        router: AuthRouter,
        path: '/auth'
    }
]

appRoutes.forEach((route) => AppRouter.use(route.path, route.router))


export default AppRouter;