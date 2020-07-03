import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = environment.weatherAPIKey;
  apiUrl = environment.weatherAPIUrl;
  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lng: number) {
    return this.http.get(`${this.apiUrl}/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${this.apiKey}`);
  }

  getForecast(lat: number, lng: number) {
    return this.http.get(`${this.apiUrl}/forecast?lat=${lat}&lon=${lng}&units=imperial&appid=${this.apiKey}`);
  }
  getDayForecast(lat: number, lng: number) {
    return this.http.get(`${this.apiUrl}/forecast/daily?lat=${lat}&lon=${lng}&cnt=5&units=imperial&appid=${this.apiKey}`);
  }
  getUv(lat: number, lon: number) {
    const startDate = Math.round(+moment(new Date()).subtract(1, 'week').toDate() / 1000);
    const endDate = Math.round(+moment(new Date()).add(1, 'week').toDate() / 1000);
    return this.http.get(`${this.apiUrl}/uvi/history?lat=${lat}&lon=${lon}&start=${startDate}&end=${endDate}&appid=${this.apiKey}`);
  }
}
