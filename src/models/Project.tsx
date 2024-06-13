import * as yup from "yup"
import { ProjectSchema } from "../schemas";

export interface ProjectType {
    id: number;
    title: string;
}  

export type ProjectSchemaType = yup.InferType<typeof ProjectSchema>