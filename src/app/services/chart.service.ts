import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartData } from '../interfaces/chart.interface';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chart!: Chart;
  private canvas!: HTMLCanvasElement;

  constructor() {}

  public initializeChart(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    Chart.register(...registerables);
    this.updateChart([{ timestamp: 0, speed: 0 }]);
  }

  public updateChart(chartData: ChartData[]): void {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: this.getDates(chartData),
        datasets: [
          {
            label: 'Speed',
            data: this.getSpeeds(chartData),
            borderColor: 'red',
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'yyyy-MM-dd HH:mm',
            },
          },
        },
      },
    });
  }

  private getSpeeds(chartData: ChartData[]): number[] {
    return chartData.map((entry: ChartData) => entry.speed);
  }

  private getDates(chartData: ChartData[]): Date[] {
    return chartData.map((entry: ChartData) => new Date(entry.timestamp));
  }
}
