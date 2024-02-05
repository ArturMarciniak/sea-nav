import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';
import { RoutePickerComponent } from './components/route-picker/route-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RoutePickerComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
