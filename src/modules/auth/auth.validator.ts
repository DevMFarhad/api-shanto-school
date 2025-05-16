import { z } from 'zod';

const loginUserSchema = z.object({
    id: z.string({
        invalid_type_error: 'User id must be string',
        required_error: 'User id must be provide',
    }),
    password: z.string({
        invalid_type_error: 'Password must be string',
        required_error: 'Password must be provide',
    }),
});

const changePasswordSchema = z.object({
    oldPassword: z.string({
        invalid_type_error: 'Old password must be string',
        required_error: 'Old password must be provide',
    }),
    newPassword: z.string({
        invalid_type_error: 'New password must be string',
        required_error: 'New password must be provide',
    }),
});

export const AuthSchema = {
    loginUserSchema,
    changePasswordSchema,
};
