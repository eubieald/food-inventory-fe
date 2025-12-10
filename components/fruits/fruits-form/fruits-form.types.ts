import z from "zod";
import { fruitsFormSchema } from "./fruits-from.schema";

export type FormInput = z.infer<typeof fruitsFormSchema>;
