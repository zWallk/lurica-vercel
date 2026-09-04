import z from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    username: z.string().min(1).max(16).regex(/^\S*$/),
    password: z.string().min(6).max(16),
    name: z.string().min(3),
    lastname: z.string().min(3)
})

export function validateRegister(data) {
    return registerSchema.safeParse(data);
}

const updateUserSchema = registerSchema.partial();

export function validateUpdateUser(data) {
    return updateUserSchema.safeParse(data);
}