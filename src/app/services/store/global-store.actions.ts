export enum GlobalActionTypes {
  LoadLaunches = '[Global] LoadLaunches',
  LoadStatuses = '[Global] LoadStatuses',
  LoadAgencies = '[Global] LoadAgencies',
  LoadMissions = '[Global] LoadMissions',
  SearchStatusChanged = '[Global] SearchStatusChanged'
}

export interface Action {
  readonly type: GlobalActionTypes;
  readonly payload: any;
}

export class LoadLaunches implements Action {
  public readonly type = GlobalActionTypes.LoadLaunches;
  constructor(public readonly payload: any[]) {}
}

export class LoadStatuses implements Action {
  public readonly type = GlobalActionTypes.LoadStatuses;
  constructor(public readonly payload: any[]) {}
}

export class LoadAgencies implements Action {
  public readonly type = GlobalActionTypes.LoadAgencies;
  constructor(public readonly payload: any[]) {}
}

export class LoadMissions implements Action {
  public readonly type = GlobalActionTypes.LoadMissions;
  constructor(public readonly payload: any[]) {}
}

export class SearchStatusChanged implements Action {
  public readonly type = GlobalActionTypes.SearchStatusChanged;
  constructor(public readonly payload: any) {}
}

export type GlobalActions = LoadLaunches | LoadStatuses | LoadAgencies | LoadMissions | SearchStatusChanged;
