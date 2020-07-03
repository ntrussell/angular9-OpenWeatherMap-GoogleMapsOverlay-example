import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SearchLocationComponent } from './search-location/search-location.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {AgmCoreModule} from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatSelectModule} from '@angular/material/select';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastDayComponent } from './forecast-day/forecast-day.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchLocationComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    ForecastDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gMapsAPIKey,
      libraries: ['places', 'drawing']
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
