import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
    providedIn: 'root' 
  })
export class WeatherService {
    private cities: City[] = [];
    private baseUrl = 'http://localhost:4454'; 
  
    constructor(private http: HttpClient) {}

    getCities(): City[] {
        return this.cities;
    }
    setCities(cities: City[]): void {
        this.cities = cities;
    }
  
    getAllCities(): Observable<City[]> {
      return this.http.get<City[]>(`${this.baseUrl}/forecast`);
    }
  
    getCityForecast(cityId: number): Observable<City> {
      return this.http.get<City>(`${this.baseUrl}/cityForecast/${cityId}`);
    }
  }