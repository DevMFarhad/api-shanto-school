/* eslint-disable no-console */
import config from '../config';
import dbClient from '../dbClient';
import { bcryptHelpers } from './bcryptHelpers';

const seedAdmin = async () => {
    const payload = {
        id: config.super_admin_id,
        password: config.super_admin_pass,
    };

    payload.password = await bcryptHelpers.hashPassword(payload.password);

    const isExist = await dbClient.user.findFirst({
        where: {
            role: 'SUPER_ADMIN',
        },
    });

    if (!isExist) {
        await dbClient.$transaction(async (tx) => {
            await tx.user.create({
                data: {
                    ...payload,
                    role: 'SUPER_ADMIN',
                },
            });

            await tx.admin.create({
                data: {
                    userId: payload.id,
                    name: config.app_name,
                    email: 'NA',
                    fatherName: 'NA',
                    motherName: 'NA',
                    dob: new Date(),
                    phone: 'NA',
                    position: 'NA',
                },
            });
        });

        console.log('Admin Seeding successful');
    }
};

export default seedAdmin;
