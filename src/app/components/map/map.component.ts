import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { map, Subscription } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { MappingUtils } from 'src/app/utils/mapping.utils';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public map!: L.Map;
  private subscription: Subscription = new Subscription();
  @ViewChild('mapContainer') private mapContainer!: ElementRef;

  constructor(private mapService: MapService) {}

  public ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapContainer);
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.mapService
        .getRoute()
        .pipe(map(MappingUtils.mapRoutePointsToGpsPoint))
        .subscribe((route: L.LatLngExpression[]) => {
          this.mapService.drawSeaRoute(route);
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
