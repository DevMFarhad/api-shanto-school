import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import authChecker from '../../middlewares/authChecker';
import reqBodyChecker from '../../middlewares/reqBodyChecker';
import { AuthSchema } from './auth.validator';

const router = Router();

router.post(
    '/login',
    reqBodyChecker(AuthSchema.loginUserSchema),
    AuthControllers.loginUser,
);

router.patch(
    '/change-password',
    reqBodyChecker(AuthSchema.changePasswordSchema),
    authChecker('SUPER_ADMIN', 'ADMIN', 'STUDENT', 'TEACHER'),
    AuthControllers.changePassword,
);

router.get(
    '/my-profile',
    authChecker('SUPER_ADMIN', 'ADMIN', 'STUDENT', 'TEACHER'),
    AuthControllers.myProfile,
);

export const AuthRouter = router;
