import bcrypt from 'bcrypt'
import config from '../config';

const hashPassword = async (planText: string) => {
    return await bcrypt.hash(planText, config.bcrypt_salt)
}

const checkPassword = async (planPassword: string, hashPassword: string,) => {
    return await bcrypt.compare(planPassword, hashPassword)
}


export const bcryptHelpers = {
    hashPassword,
    checkPassword
};