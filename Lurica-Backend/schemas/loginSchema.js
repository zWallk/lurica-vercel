import z from 'zod';

const loginSchema = z.object({
    username: z.string().min(1).max(16).regex(/^\S*$/),
    password: z.string().min(1).max(16),
})

export function validateLogin(data) {
    return loginSchema.safeParse(data);
}