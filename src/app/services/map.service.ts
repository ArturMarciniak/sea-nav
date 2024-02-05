import { ElementRef, Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { tileLayerOptions, tileLayerUrl } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public map!: Map;
  public route: Subject<any> = new Subject();
  private routeLayer: L.LayerGroup = L.layerGroup();

  public initializeMap(mapContainer: ElementRef): void {
    this.createMap(mapContainer);
    this.setTileLayer();
    this.routeLayer.addTo(this.map);
  }

  public setRoute(selectedRoute: any): void {
    this.route.next(selectedRoute);
  }

  public getRoute(): Observable<any> {
    return this.route.asObservable();
  }

  public drawSeaRoute(points: L.LatLngExpression[]): void {
    if (!this.map) {
      return;
    }
    this.clearRoute();
    this.drawLines(points);
  }

  public invalidateSize(): void {
    this.map.invalidateSize();
  }

  private setTileLayer(): void {
    L.tileLayer(tileLayerUrl, tileLayerOptions).addTo(this.map);
  }

  private clearRoute(): void {
    this.routeLayer.clearLayers();
  }

  private getSlowSpeedPolylines(
    routePoints: L.LatLngExpression[]
  ): L.Polyline<any>[] {
    const slowRoadParts = this.getSlowRoadParts(routePoints);

    return slowRoadParts.map((slowSpeedPoints: L.LatLngExpression[]) => {
      return L.polyline(slowSpeedPoints, { color: 'red' });
    });
  }

  private drawLines(points: L.LatLngExpression[]): void {
    const mainLine = L.polyline(points, { color: 'green' });
    const redPolyLines = this.getSlowSpeedPolylines(points);

    mainLine.addTo(this.routeLayer);
    redPolyLines.forEach((redLine: L.Polyline<any>) => {
      redLine.addTo(this.routeLayer);
    });

    this.map.fitBounds(mainLine.getBounds());
  }

  private createMap(mapContainer: ElementRef): void {
    this.map = L.map(mapContainer.nativeElement, {
      center: [0, 0],
      zoom: 1,
    });
  }

  private getSlowRoadParts(
    routePoints: L.LatLngExpression[]
  ): L.LatLngExpression[][] {
    const totalLength = routePoints.length;
    const part1Length = Math.ceil(totalLength / 6);
    const part2Length = Math.floor((totalLength * 4) / 6);

    const start = routePoints.slice(0, part1Length);
    const end = routePoints.slice(part1Length + part2Length);

    return [start, end];
  }
}
