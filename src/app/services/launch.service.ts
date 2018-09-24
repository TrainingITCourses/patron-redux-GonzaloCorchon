import { Injectable } from '@angular/core';
import { Launch } from '../interfaces/launch';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SearchMode } from '../enums/search-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  private launches: Launch[];

  constructor(private http:HttpClient) { }

  private getLaunches() : Observable<Launch[]>{
    if(this.launches) return of(this.launches);
    
    return this.http.get("../../assets/launchlibrary.json")
              .pipe(
                map((res: any) => res.launches),
                tap((res) => this.launches = res)
              );
  }

  private sortLaunches(a:Launch, b:Launch){
     return a.name.localeCompare(b.name);
  }

  //Busca los lanzamientos en función del criterio de búsqueda
  public search(searchMode:SearchMode, id?:number) : Observable<Launch[]>{
    if(id != null) {
      switch(searchMode){
        case SearchMode.Agency:
          //Lanzamientos de cuyas misiones forma parte la agencia
          return this.getLaunches().pipe(map(launches => launches.filter( launch => launch.missions != null && launch.missions.some(mission => mission.agencies != null && mission.agencies.some( agency => agency.id == id ))).sort(this.sortLaunches)));
        case SearchMode.Mission:
          //Lanzamientos de cuyas misiones son de un tipo concreto
          return this.getLaunches().pipe(map(launches => launches.filter( launch => launch.missions != null && launch.missions.some(mission => mission.type == id )).sort(this.sortLaunches)));
        case SearchMode.Status:
          //Lanzamientos que se encuentran en un estado concreto
          return this.getLaunches().pipe(map(launches => launches.filter( launch => launch.status == id ).sort(this.sortLaunches)));
      }
    } else {
      return of([]);
    }
  }
}
