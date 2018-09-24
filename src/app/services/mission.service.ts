import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../interfaces/mission';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private missions:Mission[];

  constructor(private http:HttpClient) { }

  //Obtiene todos los tipos de misión ordenados alfabéticamente
  public getMissions() : Observable<Mission[]> {
    if(this.missions) return of(this.missions);
    
    return this.http.get("../../assets/launchmissions.json")
              .pipe(
                map((res: any) => (<Mission[]>res.types).sort((a:Mission, b:Mission) => a.name.localeCompare(b.name))),
                tap((res) => this.missions = res)
              );
  }
}
