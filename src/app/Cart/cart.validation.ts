import { z } from "zod";

export const addItemValidation = z.object({
    body: z.object({
        productId: z.string().min(1),
        quantity: z.number().min(1),
    }),
});

export const removeItemValidation = z.object({
    body: z.object({
        productId: z.string().min(1),
    }),
});

export const CartValidation = {
    addItemValidation,
    removeItemValidation,
};
