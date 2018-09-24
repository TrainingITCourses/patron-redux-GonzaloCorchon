import { SearchMode } from "../enums/search-mode.enum";

export interface SearchEventArgs {
    searchMode:SearchMode;
    id?:number;
}
