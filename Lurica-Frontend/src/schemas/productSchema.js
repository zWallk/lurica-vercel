import { z } from 'zod';

// Esquema de producto para validación en el frontend
export const productSchema = z.object({
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

// Esquema para actualización parcial
export const updateProductSchema = productSchema.partial();

// Función para validar un producto completo
export function validateProduct(data) {
    return productSchema.safeParse(data);
}

// Función para validar una actualización parcial
export function validateUpdateProduct(data) {
    return updateProductSchema.safeParse(data);
}

// Función para validar datos del formulario (con tags como string)
export function validateProductForm(formData) {
    // Convertir los datos del formulario al formato esperado por el esquema
    const productData = {
        ...formData,
        // Convertir string de tags a array
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        // Asegurar que stock y price son números
        stock: parseInt(formData.stock) || 0,
        price: parseFloat(formData.price) || 0
    };
    
    return productSchema.safeParse(productData);
}