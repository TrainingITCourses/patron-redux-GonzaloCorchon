import { Launch } from "../../interfaces/launch";
import { Status } from "../../interfaces/status";
import { Agency } from "../../interfaces/agency";
import { Mission } from "../../interfaces/mission";
import { SearchStatus } from "../../interfaces/search-status";

export interface Global {
  launches: Launch[];
  statuses: Status[];
  agencies: Agency[];
  missions: Mission[];
  searchStatus: SearchStatus;
}

export const globalInitialState: Global = {
  launches: [],
  statuses: [],
  agencies: [],
  missions: [],
  searchStatus: { searching: false }
};
