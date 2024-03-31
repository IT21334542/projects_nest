import { z } from "zod";

export const ProjectValidationSchema = z.object({
    id: z.string().min(1, "Id is required"),
    name: z.string().min(1, "Name is Required"),
    description: z.string().optional(),
    dueDate:z.date().optional(),
    OwnerId: z.string(),
    spaceId:z.string().min(1,"")
});
