// src/app/graph/graph.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  chart!: Chart;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.selectedRoute.subscribe((route) => {
      if (route) {
        this.createChart(route.points);
      }
    });
  }

  createChart(dataPoints: any[]) {
    const timestamps = dataPoints.map((point) => new Date(point[2]));
    const speeds = dataPoints.map((point) => point[3]);
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('speedChart', {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Speed (knots)',
            data: speeds,
            borderColor: 'blue',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
