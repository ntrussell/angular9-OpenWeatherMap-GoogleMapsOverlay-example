import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {Location} from '../models/location.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  @Input() selectedLocation: Location;
  currentWeather: any = {} as any;
  forecast: any = {} as any;
  uv: any[] = [];
  msg: string;
  latitude: number;
  longitude: number;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.latitude = this.selectedLocation.latitude;
    this.longitude = this.selectedLocation.longitude;
    this.searchWeather();
  }
  searchWeather() {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(this.latitude, this.longitude)
      .subscribe(res => {
        this.currentWeather = res;
      }, err => {
      }, () => {
        this.searchForecast(this.latitude, this.longitude);
      });
  }

  searchForecast(lat: number, lng: number) {
    this.weatherService.getForecast(this.latitude, this.longitude)
      .subscribe(res => {
        this.forecast = res;
      }, err => {
      });
  }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
