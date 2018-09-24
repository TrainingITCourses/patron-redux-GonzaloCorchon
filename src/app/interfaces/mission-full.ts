import { Agency } from "./agency";

export interface MissionFull {
    id: number;
    name: string;
    type: number;
    agencies:Agency[];
}