import { GROUP, SECTION, CURRICULUM, CURRICULUM_VERSION } from '@prisma/client';

export interface ICreateClass {
    grade: number;
    section?: SECTION;
    group?: GROUP;
    curriculum?: CURRICULUM;
    curriculumVersion: CURRICULUM_VERSION;
}
