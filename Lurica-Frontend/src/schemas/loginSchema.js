import z from 'zod';

const loginSchema = z.object({
    username: z.string()
        .min(1, "El nombre de usuario es requerido")
        .max(16, "El nombre de usuario no puede tener más de 16 caracteres")
        .regex(/^\S*$/, "El nombre de usuario no puede contener espacios"),
    password: z.string()
        .min(1, "La contraseña es requerida")
        .max(16, "La contraseña no puede tener más de 16 caracteres"),
});

export function validateLogin(data) {
    return loginSchema.safeParse(data);
}