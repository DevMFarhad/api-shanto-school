import { Router } from 'express';
import { AcademicControllers } from './academic.controller';
import reqBodyChecker from '../../middlewares/reqBodyChecker';
import authChecker from '../../middlewares/authChecker';
import { AcademicSchemas } from './academic.validator';
import { ADMIN_ACCESS_ROLES, ALL_ACCESS_ROLES } from '../../const';

const router = Router();

router.post(
    '/create-class',
    reqBodyChecker(AcademicSchemas.createClassSchema),
    authChecker(...ADMIN_ACCESS_ROLES),
    AcademicControllers.createClass,
);

router.get('/classes', authChecker(...ALL_ACCESS_ROLES), AcademicControllers.getClasses);

export const AcademicRoutes = router;
