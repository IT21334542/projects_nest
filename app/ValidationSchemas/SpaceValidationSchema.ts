import { z } from "zod";

export const SpaceCreateSchema = z.object({
    id: z.string().min(1, "Id is required"),
    name: z.string().min(1, "Name is Required"),
    description: z.string().optional(),
    createdby: z.string().optional()
});
