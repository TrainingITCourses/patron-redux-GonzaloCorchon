import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchEventArgs } from './interfaces/search-event-args';
import { AgencyService } from './services/agency.service';
import { MissionService } from './services/mission.service';
import { StatusService } from './services/status.service';
import { LaunchService } from './services/launch.service';
import { Launch } from './interfaces/launch';
import { forkJoin } from 'rxjs';
import { SearchStatus } from './interfaces/search-status';
import { GlobalStore } from './services/store/global.store.state';
import { LoadAgencies, LoadMissions, LoadStatuses, LoadLaunches, SearchStatusChanged } from './services/store/global-store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tarea 2';

  loading:boolean = true;
  searchStatus:SearchStatus = { searching: false };

  constructor(private agencyService:AgencyService, 
              private missionService:MissionService, 
              private statusService:StatusService, 
              private launchService:LaunchService,
              private global:GlobalStore) { }

  ngOnInit() {

    forkJoin( this.agencyService.getAgencies(),
              this.missionService.getMissions(),
              this.statusService.getStatuses()).subscribe(result => {
                  this.global.dispatch(new LoadAgencies(result[0]));
                  this.global.dispatch(new LoadMissions(result[1]));
                  this.global.dispatch(new LoadStatuses(result[2]));

                  this.loading = false;
    });
  }

  onSearch(eventArgs:SearchEventArgs) : void {
    this.global.dispatch(new SearchStatusChanged({ searching: true }));
    this.launchService.search(eventArgs.searchMode, eventArgs.id).subscribe((data:Launch[])=>{
        this.global.dispatch(new LoadLaunches(data));
        this.global.dispatch(new SearchStatusChanged({ searching: false }));
    });  
  }
}
