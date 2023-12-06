// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private routes: any[] = [];
  public selectedRoute = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  loadRoutes(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get('/assets/web_challenge.csv', { responseType: 'text' })
        .subscribe((data) => {
          Papa.parse(data, {
            header: true,
            complete: (result) => {
              this.routes = result.data;
              resolve(this.routes);
            },
            error: (error: any) => reject(error),
          });
        });
    });
  }

  getRouteById(routeId: string) {
    const selected = this.routes.find((route) => route.route_id == routeId);
    return {
      ...selected,
      points:
        typeof selected.points === 'string'
          ? JSON.parse(selected.points)
          : selected.points,
    };
  }
}
