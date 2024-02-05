import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NavigationRoute } from 'src/app/interfaces/map.interface';
import { DataService } from 'src/app/services/data.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-route-picker',
  templateUrl: './route-picker.component.html',
  styleUrls: ['./route-picker.component.scss'],
})
export class RoutePickerComponent implements OnInit, OnDestroy {
  @Input() public options!: any;
  public fc = new FormControl();
  public routes$!: Observable<NavigationRoute[]>;
  private subscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private mapService: MapService
  ) {}

  public ngOnInit(): void {
    this.routes$ = this.dataService.getRoutes();

    this.subscription.add(
      this.fc.valueChanges.subscribe((route) => {
        this.mapService.setRoute(route);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
