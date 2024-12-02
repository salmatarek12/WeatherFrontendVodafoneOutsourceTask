import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/WeatherService.service';
import { City, Forecast } from '../../models/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})

export class CityListComponent implements OnInit {
  cities: City[] = [];
  cityUnits: { [key: number]: 'C' | 'F' } = {};  // Store temperature unit for each city by city ID

  selectedForecasts: { [key: number]: Forecast | null } = {}; // Selected forecast for each city
  selectedDates: { [key: number]: string } = {}; // Selected date for each city


  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getAllCities().subscribe(data => {
      this.cities = data.map(city => {
        const sortedForecast = this.getSortedForecast(city.forecast);
        city.forecast = sortedForecast; 
        return city;
      });
      // Initialize temperature unit for each city (default to Celsius)
      this.cities.forEach(city => {
        this.cityUnits[city.id] = 'C';
        this.selectedForecasts[city.id] = city.forecast[0]; // Default to the most recent forecast
        this.selectedDates[city.id] = this.selectedForecasts[city.id]?.date || '';
      });
      this.weatherService.setCities(data);
    });
    
  }

  getSortedForecast(forecasts: Forecast[]): Forecast[] {
    return forecasts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //sort weather based on date
  }

  toggleUnit(cityId: number): void {
    // Toggle the temperature unit for the specified city
    this.cityUnits[cityId] = this.cityUnits[cityId] === 'C' ? 'F' : 'C';
  }

  handleDateChange(event: Event, cityId: number): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.selectedDates[cityId] = selectedDate;

    const city = this.cities.find(city => city.id === cityId);
    if (city) {
      const forecast = city.forecast.find(f => f.date === selectedDate);
      if (forecast) {
        this.selectedForecasts[cityId] = forecast;
      } else {
        this.selectedForecasts[cityId] = null; // No forecast available for the selected date
      }
    }
  }

  getMaxDate(city: City): string {
    return city.forecast[0]?.date || '';
  }

  getMinDate(city: City): string {
    return city.forecast[city.forecast.length - 1]?.date || '';
  }

}
