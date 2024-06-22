import { z } from 'zod';

const createService = z.object({
    body: z.object({
        name: z.string({ message: "Name is required" }),
        description: z.string({ message: "Description is required" }),
        price: z.number({ message: "Price must be a positive number" }),
        duration: z.number({ message: "Duration must be a positive number" }),
        isDeleted: z.boolean().default(false)
    })
});

export const serviceValidationSchema = {
    createService,
}