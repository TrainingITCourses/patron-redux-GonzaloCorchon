import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Launch } from '../../interfaces/launch';
import { SearchStatus } from '../../interfaces/search-status';
import { GlobalStore, GlobalSlideTypes } from '../../services/store/global.store.state';
import { Observable } from 'rxjs';
import { Status } from '../../interfaces/status';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-launch-listing',
  templateUrl: './launch-listing.component.html',
  styleUrls: ['./launch-listing.component.css']
})
export class LaunchListingComponent implements OnInit {

  launches$:Observable<Launch[]>;
  searchStatus$:Observable<Status>;

  constructor(private global:GlobalStore) { }

  ngOnInit() {
    this.launches$ = this.global.select$(GlobalSlideTypes.Launches);
    this.searchStatus$ = this.global.select$(GlobalSlideTypes.Statuses);
  }
}
