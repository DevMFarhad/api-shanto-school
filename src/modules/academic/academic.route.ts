import { Router } from 'express';
import { AcademicControllers } from './academic.controller';
import reqBodyChecker from '../../middlewares/reqBodyChecker';
import authChecker from '../../middlewares/authChecker';
import { AcademicSchemas } from './academic.validator';

const router = Router();

router.post(
    '/create-class',
    reqBodyChecker(AcademicSchemas.createClassSchema),
    authChecker('SUPER_ADMIN', 'ADMIN'),
    AcademicControllers.createClass,
);

export const AcademicRoutes = router;
