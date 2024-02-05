import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import 'chartjs-adapter-date-fns';
import { map, Subscription } from 'rxjs';
import { ChartData } from 'src/app/interfaces/chart.interface';
import { ChartService } from 'src/app/services/chart.service';
import { MapService } from 'src/app/services/map.service';
import { MappingUtils } from 'src/app/utils/mapping.utils';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('speedChart') private canvas!: ElementRef<HTMLCanvasElement>;
  private subscription: Subscription = new Subscription();

  constructor(
    private mapService: MapService,
    private chartService: ChartService
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.mapService
        .getRoute()
        .pipe(map(MappingUtils.mapRouteToChartData))
        .subscribe((chartData: ChartData[]) => {
          this.chartService.updateChart(chartData);
        })
    );
  }

  public ngAfterViewInit(): void {
    this.chartService.initializeChart(this.canvas.nativeElement);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
