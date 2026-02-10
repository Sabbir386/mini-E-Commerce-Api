import { z } from "zod";

export const createProductValidation = z.object({
    body: z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        price: z.number().positive(),
        stock: z.number().min(0),
    }),
});

export const updateProductValidation = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        stock: z.number().min(0).optional(),
    }),
});

export const ProductValidation = {
    createProductValidation,
    updateProductValidation,
};
