import config from "../config";
import dbClient from "../dbClient";
import { bcryptHelpers } from "./bcryptHelpers";

const seedAdmin = async () => {
    const payload = {
        id: config.super_admin_id,
        password: config.super_admin_pass
    }

    payload.password = await bcryptHelpers.hashPassword(payload.password)

    const isExist = await dbClient.user.findFirst({
        where: {
            role: 'ADMIN'
        }
    })

    if (!isExist) {
        await dbClient.user.create({
            data: {
                ...payload,
                role: 'ADMIN'
            }
        })
        console.log('Admin Seeding successful')
    }

};

export default seedAdmin;