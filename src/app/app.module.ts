// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { RoutePickerComponent } from './route-picker/route-picker.component';
import { GraphComponent } from './graph/graph.component';
import { NgChartsModule } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RoutePickerComponent,
    GraphComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
