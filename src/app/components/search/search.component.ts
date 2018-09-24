import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { Agency } from '../../interfaces/agency';
import { Status } from '../../interfaces/status';
import { Mission } from '../../interfaces/mission';
import { SearchEventArgs } from '../../interfaces/search-event-args';
import { SearchMode } from '../../enums/search-mode.enum';
import { GlobalStore, GlobalSlideTypes } from '../../services/store/global.store.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  agencies:Agency[];
  statuses:Status[];
  missions:Mission[];

  @Output() public search:EventEmitter<SearchEventArgs> = new EventEmitter<SearchEventArgs>();

  private mode:SearchMode = SearchMode.Agency;

  SearchMode = SearchMode; //Para poder acceder a la enumeración desde la template

  constructor(private global:GlobalStore) { }

  ngOnInit() {
    this.global.select$(GlobalSlideTypes.Agencies).subscribe((data:Agency[]) => this.agencies = data );
    this.global.select$(GlobalSlideTypes.Missions).subscribe((data:Mission[]) =>this.missions = data );
    this.global.select$(GlobalSlideTypes.Statuses).subscribe((data:Status[]) =>  this.statuses = data );
  }

  filterChanged(value:number) : void {
    //Notificamos al contenedor que estamos filtrando 
    this.search.next({ searchMode: this.mode, id: value });
  }

  searchModeChanged(mode:SearchMode) : void {
    this.mode = mode;
    //Notificamos al contenedor que hemos cambiado el modo de búsqueda
    //Será el servicio de lanzamientos el que decida si devuelve todos los lanzamientos o ninguno cuando no hay filtro seleccionado.
    this.search.next({ searchMode: this.mode });
  }

  getDataSource(): { id:number, name:string }[] {
    
    switch(this.mode) {
      case SearchMode.Agency: return this.agencies;
      case SearchMode.Mission: return this.missions;
      case SearchMode.Status: return this.statuses;
    }
  }

}
