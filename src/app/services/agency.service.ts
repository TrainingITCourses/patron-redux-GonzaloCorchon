import { Injectable } from '@angular/core';
import { Agency } from '../interfaces/agency';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private agencies:Agency[];

  constructor(private http:HttpClient) { }

  //Obtiene todas las agencias disponibles ordenadas alfabéticamente
  public getAgencies() : Observable<Agency[]> {
    if(this.agencies) return of(this.agencies);
    
    return this.http.get("../../assets/launchagencies.json")
              .pipe(
                map((res: any) => (<Agency[]>res.agencies).sort((a:Agency, b:Agency) => a.name.localeCompare(b.name))),
                tap((res) => this.agencies = res)
              );
  }
}
