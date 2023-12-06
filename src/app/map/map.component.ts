// src/app/map/map.component.ts
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private routeLayer!: L.LayerGroup;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.map = L.map('map', { center: [0, 0], zoom: 2 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
    this.routeLayer = L.layerGroup().addTo(this.map);

    this.dataService.selectedRoute.subscribe((route) => {
      if (route) {
        this.addRoute(route.points);
      } else {
        this.clearRoutes();
      }
    });
  }

  addRoute(points: [any]) {
    this.clearRoutes();
    const maxSpeed = Math.max(...points.map((p) => p[3]));
    const minSpeed = Math.min(...points.map((p) => p[3]));

    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];

      const normalizedSpeed = (start[3] - minSpeed) / (maxSpeed - minSpeed);
      const hue = normalizedSpeed * 120; // hue varies from 0 (red) to 120 (green)
      const color = `hsl(${hue}, 100%, 50%)`;
      const latLngs = [
        [start[1], start[0]],
        [end[1], end[0]],
      ];

      L.polyline(latLngs, { color: color }).addTo(this.routeLayer);
    }

    this.map.fitBounds(
      points.map((p) => [p[1], p[0]]) as L.LatLngBoundsExpression
    );
  }

  clearRoutes() {
    this.routeLayer.clearLayers();
  }
}
