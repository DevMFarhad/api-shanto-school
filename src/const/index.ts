import { ROLE } from '@prisma/client';

export const ALL_ACCESS_ROLES: ROLE[] = ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] as const;

export const ADMIN_ACCESS_ROLES: ROLE[] = ['SUPER_ADMIN', 'ADMIN'] as const;
