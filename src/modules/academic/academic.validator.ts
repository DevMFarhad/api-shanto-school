import { CURRICULUM, CURRICULUM_VERSION, GROUP, SECTION } from '@prisma/client';
import { z } from 'zod';

const createClassSchema = z.object({
    grade: z
        .number({
            invalid_type_error: 'Grade must be a integer value',
            required_error: 'Grade must be provide',
        })
        .int({
            message: 'Grade must be a integer value',
        }),
    section: z.enum(Object.values(SECTION) as [string, ...string[]]).optional(),
    group: z.enum(Object.values(GROUP) as [string, ...string[]]).optional(),
    curriculum: z.enum(Object.values(CURRICULUM) as [string, ...string[]]).optional(),
    curriculumVersion: z
        .enum(Object.values(CURRICULUM_VERSION) as [string, ...string[]])
        .optional(),
});

export const AcademicSchemas = {
    createClassSchema,
};
