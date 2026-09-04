import z from 'zod';

const registerSchema = z.object({
    email: z.string({
        required_error: "El email es requerido",
        invalid_type_error: "El email debe ser un texto"
    })
    .email({ message: "Email inválido" })
    .min(5, { message: "El email debe tener al menos 5 caracteres" })
    .max(50, { message: "El email no puede tener más de 50 caracteres" })
    .toLowerCase(),

    username: z.string({
        required_error: "El nombre de usuario es requerido",
        invalid_type_error: "El nombre de usuario debe ser un texto"
    })
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
    .max(16, { message: "El nombre de usuario no puede tener más de 16 caracteres" })
    .regex(/^\S*$/, { 
        message: "El nombre de usuario no puede contener espacios" 
    })
    .regex(/^[a-zA-Z0-9_-]*$/, {
        message: "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos"
    }),

    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "La contraseña debe ser un texto"
    })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(16, { message: "La contraseña no puede tener más de 16 caracteres" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    }),

    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un texto"
    })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(30, { message: "El nombre no puede tener más de 30 caracteres" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, {
        message: "El nombre solo puede contener letras y espacios"
    })
    .transform(val => val.trim())
    .refine(val => val.length >= 3, {
        message: "El nombre debe tener al menos 3 caracteres sin contar espacios"
    }),

    lastname: z.string({
        required_error: "El apellido es requerido",
        invalid_type_error: "El apellido debe ser un texto"
    })
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" })
    .max(30, { message: "El apellido no puede tener más de 30 caracteres" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, {
        message: "El apellido solo puede contener letras y espacios"
    })
    .transform(val => val.trim())
    .refine(val => val.length >= 3, {
        message: "El apellido debe tener al menos 3 caracteres sin contar espacios"
    })
});

// Esquema para actualización (todos los campos son opcionales)
const updateUserSchema = registerSchema.partial();

export function validateRegister(data) {
    return registerSchema.safeParse(data);
}

export function validateUpdateUser(data) {
    return updateUserSchema.safeParse(data);
}