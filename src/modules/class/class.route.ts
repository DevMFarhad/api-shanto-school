import { Router } from 'express';
import { ClassControllers } from './class.controller';
import reqBodyChecker from '../../middlewares/reqBodyChecker';
import authChecker from '../../middlewares/authChecker';
import { ClassSchemas } from './class.validator';
import { ADMIN_ACCESS_ROLES } from '../../const';

const router = Router();

router.post(
    '/',
    reqBodyChecker(ClassSchemas.createClassSchema),
    authChecker(...ADMIN_ACCESS_ROLES),
    ClassControllers.createClass,
);

router.get('/', ClassControllers.getClasses);

router.get('/:classId', ClassControllers.classDetails);

router.patch(
    '/:classId',
    reqBodyChecker(ClassSchemas.updateClassSchema),
    authChecker(...ADMIN_ACCESS_ROLES),
    ClassControllers.updateClass,
);

router.delete('/:classId', authChecker(...ADMIN_ACCESS_ROLES), ClassControllers.deleteClass);

export const ClassRoutes = router;
