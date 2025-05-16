import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import authChecker from '../../middlewares/authChecker';

const router = Router();

router.post('/login', AuthControllers.loginUser);
router.patch(
    '/change-password',
    authChecker('ADMIN', 'STUDENT', 'TEACHER'),
    AuthControllers.changePassword,
);

export const AuthRouter = router;
