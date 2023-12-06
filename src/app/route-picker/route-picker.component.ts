// src/app/route-picker/route-picker.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-route-picker',
  templateUrl: './route-picker.component.html',
  styleUrls: ['./route-picker.component.css'],
})
export class RoutePickerComponent implements OnInit {
  routes: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.loadRoutes().then((routes) => {
      this.routes = routes;
    });
  }

  selectRoute(routeId: string) {
    const selectedRoute = this.dataService.getRouteById(routeId);
    this.dataService.selectedRoute.next(selectedRoute);
  }
}
