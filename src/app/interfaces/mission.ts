import { Agency } from "./agency";

export interface Mission {
    id: number;
    name: string;
    type: number;
    agencies:Agency[];
}