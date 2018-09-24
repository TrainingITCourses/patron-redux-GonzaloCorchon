import { MissionFull } from "./mission-full";

export interface Launch 
{
    id: number;
    name: string;
    status: number;
    missions: MissionFull[];
}

