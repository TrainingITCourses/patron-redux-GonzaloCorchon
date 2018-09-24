import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';
import { Global, globalInitialState } from './global.model';
import { Launch } from '../../interfaces/launch';
import { Status } from '../../interfaces/status';
import { Agency } from '../../interfaces/agency';
import { Mission } from '../../interfaces/mission';
import { SearchStatus } from '../../interfaces/search-status';

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  private state: Global = { ...globalInitialState };

  private launches$ = new BehaviorSubject<Launch[]>(this.state.launches);
  private statuses$ = new BehaviorSubject<Status[]>(this.state.statuses);
  private agencies$ = new BehaviorSubject<Agency[]>(this.state.agencies);
  private missions$ = new BehaviorSubject<Mission[]>(this.state.missions);
  private searchStatus$ = new BehaviorSubject<SearchStatus>(this.state.searchStatus);

  constructor() {}

  public select$ = (slice: GlobalSlideTypes) : Observable<any> => {
    switch (slice) {
      case GlobalSlideTypes.Launches:
        return this.launches$.asObservable();
      case GlobalSlideTypes.Statuses:
        return this.statuses$.asObservable();
      case GlobalSlideTypes.Agencies:
        return this.agencies$.asObservable();
      case GlobalSlideTypes.Missions:
        return this.missions$.asObservable();
      case GlobalSlideTypes.SearchStatus:
        return this.searchStatus$.asObservable();
    }
  };

  public selectSnapShot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.Launches:
        return [...this.state.launches];
      case GlobalSlideTypes.Statuses:
        return [...this.state.statuses];
      case GlobalSlideTypes.Agencies:
        return [...this.state.agencies];
      case GlobalSlideTypes.Missions:
        return [...this.state.missions];        
      case GlobalSlideTypes.SearchStatus:
        return {...this.state.statuses};        
    }
  };

  public dispatch = (action: GlobalActions) => {
    console.log('dispatching...', action);
    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.LoadLaunches:
        this.launches$.next([...this.state.launches]);
        break;
      case GlobalActionTypes.LoadStatuses:
        this.statuses$.next([...this.state.statuses]);
        break;
      case GlobalActionTypes.LoadAgencies:
        this.agencies$.next([...this.state.agencies]);
        break;
      case GlobalActionTypes.LoadMissions:
        this.missions$.next([...this.state.missions]);
        break;        
      case GlobalActionTypes.SearchStatusChanged:
        this.searchStatus$.next({...this.state.searchStatus});
        break;        
    }
  };
}

export enum GlobalSlideTypes {
  Launches = 'launches',
  Statuses = 'statuses',
  Agencies = 'agencies',
  Missions = 'missions',
  SearchStatus = 'searchStatus',
}