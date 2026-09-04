import z from 'zod';

const productSchema = z.object({
    title: z.string()
        .min(1, "El título es requerido")
        .max(100, "El título no puede tener más de 100 caracteres"),
    description: z.string()
        .min(1, "La descripción es requerida")
        .max(1000, "La descripción no puede tener más de 1000 caracteres"),
    tags: z.array(z.string())
        .min(1, "Debe incluir al menos una etiqueta")
        .max(10, "No puede tener más de 10 etiquetas"),
    img: z.string().optional(),
    stock: z.number()
        .int("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo")
        .default(0),
    price: z.number()
        .min(0, "El precio no puede ser negativo")
        .default(0)
});

const updateProductSchema = productSchema.partial();

export function validateProduct(data) {
    return productSchema.safeParse(data);
}

export function validateUpdateProduct(data) {
    return updateProductSchema.safeParse(data);
}