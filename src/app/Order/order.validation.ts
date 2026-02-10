import { z } from "zod";

const createOrderValidation = z.object({
    body: z.object({
        paymentMethod: z.enum(["cash_on_delivery", "online"]),
    }),
});

const updateStatusValidation = z.object({
    body: z.object({
        status: z.enum([
            "pending",
            "paid",
            "shipped",
            "delivered",
            "cancelled",
        ]),
    }),
});

export const OrderValidation = {
    createOrderValidation,
    updateStatusValidation,
};
