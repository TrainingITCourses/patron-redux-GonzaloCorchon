import { Injectable } from '@angular/core';
import { Status } from '../interfaces/status';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statuses:Status[];

  constructor(private http:HttpClient) { }

  //Obtiene todos los tipos de estado, ordenados alfabéticamente
  public getStatuses() : Observable<Status[]>{
    if(this.statuses) return of(this.statuses);
    
    return this.http.get("../../assets/launchstatus.json")
              .pipe(
                map((res: any) => (<Status[]>res.types).sort((a:Status, b:Status) => a.name.localeCompare(b.name))),
                tap((res) => this.statuses = res)
              );
  }
}
